export class TextUtils {
  static normalize = (text) => {
    if (typeof text !== 'string') return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]|_/g, '');
  };

  static cosineSimilarity = (vectorA, vectorB) => {
    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const normA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (normA * normB || 1);
  };

  static detectPriceIntent = (userQuestion, priceIntentKeywords = []) => {
    const normalized = TextUtils.normalize(userQuestion);
    return priceIntentKeywords.some((keyword) => normalized.includes(keyword));
  };

  static calculateKeywordScore = (query, text) => {
    // Normaliza ambas cadenas para una comparación justa.
    const normalizedQuery = this.normalize(query);
    const normalizedText = this.normalize(text);

    // Tokeniza: divide en palabras y filtra cualquier cadena vacía resultante de múltiples espacios.
    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);
    const textWords = new Set(normalizedText.split(/\s+/).filter(Boolean));

    // Si la consulta no tiene palabras clave, no hay puntuación.
    if (queryWords.length === 0) {
      return 0.0;
    }

    // LOGS DE DEPURACIÓN (puedes eliminarlos después de que funcione)
    // console.log(`[DEBUG] Query Words: [${queryWords.join(', ')}]`);
    // console.log(`[DEBUG] Text Words Count: ${textWords.size}`);

    let matchCount = 0;
    // Compara cada palabra de la consulta con el conjunto de palabras del texto.
    for (const word of queryWords) {
      if (textWords.has(word)) {
        matchCount++;
      }
    }

    // Retorna la proporción de palabras coincidentes.
    return matchCount / queryWords.length;
  };

  //   static calculateKeywordScore = (query, text) => {
  //     const normalizedQuery = this.normalize(query);
  //     const normalizedText = this.normalize(text);
  //     // Devuelve 1.0 si el texto contiene la consulta exacta, si no 0.0
  //     return normalizedText.includes(normalizedQuery) ? 1.0 : 0.0;
  //   };
}
