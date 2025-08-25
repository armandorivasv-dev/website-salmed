'use client';
import { useState, useCallback } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 'bienvenida',
    role: 'infochat',
    content: '¡Hola! Soy InfoChat, tu asistente de consultas. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date().toISOString(),
  },
];

const generateSessionId = (length) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(36))
    .join('')
    .slice(0, length);
};

export const useChatMessages = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [sessionId] = useState(() => generateSessionId(16));

  const addUserQuestion = useCallback((content) => {
    const newQuestion = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newQuestion]);
  }, []);

  const addChatResponse = useCallback((content) => {
    const newResponse = {
      id: crypto.randomUUID(),
      role: 'infochat',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newResponse]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
  }, []);

  return {
    messages,
    addUserQuestion,
    addChatResponse,
    clearMessages,
    sessionId,
  };
};
