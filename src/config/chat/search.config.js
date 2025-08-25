export const CHAT_SEARCH_CONFIG = {
  SIMILARITY_THRESHOLD: 0.5,
  SEARCH_PRIORITIES: {
    PRICE_QUERY: ['price'],
    DEFAULT: ['item', 'general'],
  },
  WEIGHTS: {
    SEMANTIC: 0.6,
    KEYWORD: 0.4,
  },
};

export const PRICE_INTENT_KEYWORDS = ['precio', 'precios', 'vale', 'valor', 'valores', 'costo', 'costos', 'cuesta'];
