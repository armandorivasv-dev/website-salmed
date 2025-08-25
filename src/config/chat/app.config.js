import path from 'path';

export const CHAT_APP_CONFIG = {
  KNOWLEDGE_PATH: path.resolve(process.cwd(), 'src/knowledge/knowledge.json'),
  VECTORS_PATH: path.resolve(process.cwd(), 'src/knowledge/vectors.json'),
  MODEL_NAME: 'Xenova/all-MiniLM-L6-v2',
  MAX_QUERY_LENGTH: 500,
  RATE_LIMIT: {
    WINDOW_MS: 60_000,
    MAX_REQUESTS: 10,
    CLEANUP_INTERVAL: 300_000,
  },
};
