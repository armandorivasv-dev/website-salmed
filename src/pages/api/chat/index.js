import { pipeline } from '@xenova/transformers';
import fs from 'fs/promises';

import { HybridSearcherService } from '@/services/chat/HybridSearcherService';
import { CHAT_APP_CONFIG } from '@/config/chat/app.config';
import { CHAT_SEARCH_CONFIG, PRICE_INTENT_KEYWORDS } from '@/config/chat/search.config';
import { CHAT_MESSAGES } from '@/config/chat/messages.config';
import { MessageLocalService } from '@/services/chat/MessageLocalService';

// Clase para manejar errores personalizados
class ChatbotError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'ChatbotError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

// Rate limiting mejorado con limpieza automática
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.startCleanupTimer();
  }

  startCleanupTimer = () => {
    setInterval(() => {
      const now = Date.now();
      for (const [ip, data] of this.requests.entries()) {
        if (now - data.startTime > CHAT_APP_CONFIG.RATE_LIMIT.WINDOW_MS) {
          this.requests.delete(ip);
        }
      }
    }, CHAT_APP_CONFIG.RATE_LIMIT.CLEANUP_INTERVAL);
  };

  isLimited = (ip) => {
    const now = Date.now();
    const entry = this.requests.get(ip) ?? { count: 0, startTime: now };

    if (now - entry.startTime > CHAT_APP_CONFIG.RATE_LIMIT.WINDOW_MS) {
      this.requests.set(ip, { count: 1, startTime: now });
      return false;
    }

    if (entry.count >= CHAT_APP_CONFIG.RATE_LIMIT.MAX_REQUESTS) {
      return true;
    }

    entry.count += 1;
    this.requests.set(ip, entry);
    return false;
  };
}

// Validador de input
class InputValidator {
  static validateQuestion = (userQuestion) => {
    if (!userQuestion) {
      throw new ChatbotError(CHAT_MESSAGES.QUERY_REQUIRED, 400, 'MISSING_QUERY');
    }

    if (typeof userQuestion !== 'string') {
      throw new ChatbotError(CHAT_MESSAGES.INVALID_QUERY, 400, 'INVALID_QUERY_TYPE');
    }

    const trimmedQuestion = userQuestion.trim();
    if (!trimmedQuestion) {
      throw new ChatbotError(CHAT_MESSAGES.QUERY_REQUIRED, 400, 'EMPTY_QUERY');
    }

    if (trimmedQuestion.length > CHAT_APP_CONFIG.MAX_QUERY_LENGTH) {
      throw new ChatbotError(CHAT_MESSAGES.QUERY_TOO_LONG, 400, 'QUERY_TOO_LONG');
    }

    return trimmedQuestion;
  };
}

class ChatPipeline {
  static instance = null;
  static loadingPromise = null;

  constructor(searcher) {
    this.searcher = searcher;
  }

  static getInstance = async () => {
    if (ChatPipeline.instance) return ChatPipeline.instance;
    if (ChatPipeline.loadingPromise) return ChatPipeline.loadingPromise;

    ChatPipeline.loadingPromise = ChatPipeline.initialize();
    return ChatPipeline.loadingPromise;
  };

  static initialize = async () => {
    try {
      const [embedder, knowledgeData, vectorsData] = await Promise.all([
        pipeline('feature-extraction', CHAT_APP_CONFIG.MODEL_NAME),
        fs.readFile(CHAT_APP_CONFIG.KNOWLEDGE_PATH, 'utf-8'),
        fs.readFile(CHAT_APP_CONFIG.VECTORS_PATH, 'utf-8'),
      ]);

      const knowledge = JSON.parse(knowledgeData);
      const vectors = JSON.parse(vectorsData);

      const searcher = new HybridSearcherService(embedder, knowledge, vectors);
      ChatPipeline.instance = new ChatPipeline(searcher);
      return ChatPipeline.instance;
    } catch (error) {
      console.error('❌ Error inicializando ChatPipeline:', error);
      ChatPipeline.loadingPromise = null;
      throw new ChatbotError('Error inicializando el sistema', 500, 'INITIALIZATION_ERROR');
    }
  };

  search = async (userQuestion) => {
    const searchConfig = {
      PRICE_INTENT_KEYWORDS,
      SEARCH_PRIORITIES: CHAT_SEARCH_CONFIG.SEARCH_PRIORITIES,
      SIMILARITY_THRESHOLD: CHAT_SEARCH_CONFIG.SIMILARITY_THRESHOLD,
      WEIGHTS: CHAT_SEARCH_CONFIG.WEIGHTS,
      MESSAGES: CHAT_MESSAGES,
    };
    return this.searcher.search(userQuestion, searchConfig);
  };
}

// Utilidades HTTP
class HttpUtils {
  static getClientIp = (req) => {
    const xff = req.headers['x-forwarded-for'];
    return xff ? xff.split(',')[0].trim() : req.connection?.remoteAddress ?? 'unknown';
  };

  static createErrorResponse = (error, res) => {
    if (error instanceof ChatbotError) {
      return res.status(error.statusCode).json({ error: error.message, code: error.code });
    }

    console.error('Error no manejado:', error);
    return res.status(500).json({ error: CHAT_MESSAGES.INTERNAL_ERROR, code: 'INTERNAL_ERROR' });
  };
}

// Instancia global del rate limiter
const rateLimiter = new RateLimiter();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userIp = HttpUtils.getClientIp(req);
  const startTime = Date.now();

  try {
    // Rate limiting
    if (rateLimiter.isLimited(userIp)) {
      throw new ChatbotError(CHAT_MESSAGES.RATE_LIMIT, 429, 'RATE_LIMIT_EXCEEDED');
    }

    const { userQuestion } = req.body;

    const validQuestion = InputValidator.validateQuestion(userQuestion);

    // Procesamiento RAG
    const chatInstance = await ChatPipeline.getInstance();
    const systemResponse = await chatInstance.search(validQuestion);
    const systemResponseTime = Date.now() - startTime;

    // servicio de mensajes original local
    const messageData = {
      userIp,
      userQuestion: validQuestion,
      systemResponse,
      systemResponseTime,
    };

    await MessageLocalService.message(messageData);
    // fin servicio de mensajes original local

    res.status(200).json({ systemResponse });
  } catch (error) {
    return HttpUtils.createErrorResponse(error, res);
  }
}
