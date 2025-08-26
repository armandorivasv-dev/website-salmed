import { put, list } from '@vercel/blob';

const MESSAGES_BLOB_KEY = 'chat-messages.json';
const MAX_MESSAGE_SIZE = parseInt(process.env.MAX_MESSAGE_SIZE ?? '10485760'); // 10MB
const MAX_PERSISTED_MESSAGES = 1000;

class MessageBlobError extends Error {
  constructor(message, code = 'BLOB_ERROR') {
    super(message);
    this.name = 'MessageBlobError';
    this.code = code;
  }
}

export class MessageBlobService {
  static getExistingMessages = async () => {
    try {
      const { blobs } = await list({ prefix: MESSAGES_BLOB_KEY.split('.')[0] });
      const messageBlob = blobs.find((blob) => blob.pathname === MESSAGES_BLOB_KEY);

      if (!messageBlob) return [];

      const response = await fetch(messageBlob.url);
      if (!response.ok) {
        throw new MessageBlobError(`Error obteniendo messages: ${response.status}`);
      }

      const messagesData = await response.json();
      return Array.isArray(messagesData) ? messagesData : [];
    } catch (error) {
      if (error instanceof MessageBlobError) throw error;
      console.warn('No se pudieron obtener mensajes existentes:', error.message);
      return [];
    }
  };

  static writeMessagesFile = async (messages) => {
    try {
      const jsonContent = JSON.stringify(messages, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });

      await put(MESSAGES_BLOB_KEY, blob, {
        access: 'public',
        contentType: 'application/json',
      });
    } catch (error) {
      throw new MessageBlobError(`Error guardando mensajes: ${error.message}`);
    }
  };

  static rotateMessages = async (messages) => {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const archiveKey = `data-${timestamp}.archive.json`;
      const archiveContent = JSON.stringify(messages, null, 2);
      const archiveBlob = new Blob([archiveContent], { type: 'application/json' });

      await put(archiveKey, archiveBlob, {
        access: 'public',
        contentType: 'application/json',
      });

      const recentMessages = messages.slice(-MAX_PERSISTED_MESSAGES);
      await this.writeMessagesFile(recentMessages);
    } catch (error) {
      console.error('Error rotando mensajes:', error);
    }
  };

  static message = async (data) => {
    if (process.env.MESSAGES_ENABLED !== 'true') return;

    try {
      const { userIp, userQuestion, systemResponse, systemResponseTime } = data ?? {};

      const now = new Date();
      const dataMessage = {
        date: now.toLocaleDateString('es-CL'),
        hour: now.toLocaleTimeString('es-CL'),
        user_ip: userIp ?? null,
        user_question: userQuestion ?? null,
        system_response: systemResponse ?? null,
        system_response_time: systemResponseTime ?? null,
      };

      const messages = await this.getExistingMessages();
      messages.push(dataMessage);

      const prospectiveContent = JSON.stringify(messages, null, 2);
      const sizeBytes = Buffer.byteLength(prospectiveContent, 'utf8');

      if (sizeBytes > MAX_MESSAGE_SIZE) {
        await this.rotateMessages(messages);
      } else {
        await this.writeMessagesFile(messages);
      }
    } catch (error) {
      console.error('Error escribiendo mensaje:', error);
    }
  };

  static getMessages = async (limit = 100) => {
    try {
      const messages = await this.getExistingMessages();
      return messages.slice(-limit).reverse();
    } catch {
      return [];
    }
  };
}
