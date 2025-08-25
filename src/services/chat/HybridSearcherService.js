import { TextUtils } from '@/utils/textUtils';

export class HybridSearcherService {
  constructor(embedder, knowledge, vectors) {
    this.embedder = embedder;
    this.knowledge = knowledge;
    this.vectors = vectors;
    // Creamos un Map para un acceso súper rápido a los datos de knowledge por ID
    this.knowledgeMap = new Map(knowledge.map((item) => [item.id, item]));
  }

  async search(userQuestion, searchConfig) {
    // Detectamos la intención (ej. precio) para ajustar la búsqueda
    const isPriceQuery = TextUtils.detectPriceIntent(userQuestion, searchConfig.PRICE_INTENT_KEYWORDS);
    const searchTypes = isPriceQuery
      ? searchConfig.SEARCH_PRIORITIES.PRICE_QUERY
      : searchConfig.SEARCH_PRIORITIES.DEFAULT;

    // Generamos el embedding de la pregunta UNA SOLA VEZ para máxima eficiencia
    const questionVector = await this.getQuestionEmbedding(userQuestion);

    const bestMatch = this.findBestMatch(questionVector, searchTypes, userQuestion);

    // Verificamos si el mejor resultado supera el umbral de confianza
    if (bestMatch.score < searchConfig.SIMILARITY_THRESHOLD) {
      return searchConfig.MESSAGES.FALLBACK;
    }

    return this.knowledgeMap.get(bestMatch.id)?.content ?? searchConfig.MESSAGES.FALLBACK;
  }

  async getQuestionEmbedding(userQuestion) {
    const normalizedQuestion = TextUtils.normalize(userQuestion);
    const output = await this.embedder(normalizedQuestion, { pooling: 'mean', normalize: true });
    return [...output.data];
  }

  findBestMatch(questionVector, searchTypes, userQuestion) {
    let bestMatch = { score: -Infinity, id: null };

    for (const type of searchTypes) {
      const typeMatch = this.searchInType(questionVector, type, userQuestion);
      if (typeMatch.score > bestMatch.score) {
        bestMatch = typeMatch;
      }
    }
    return bestMatch;
  }

  searchInType(questionVector, type, userQuestion) {
    //console.log(`\n--- Buscando en el tipo: ${type} ---`);
    const relevantKnowledge = this.knowledge.filter((item) => item.type === type);
    const relevantIds = new Set(relevantKnowledge.map((item) => item.id));
    const relevantVectors = this.vectors.filter((v) => relevantIds.has(v.id));

    let bestScore = -Infinity;
    let bestId = null;

    for (const { id, vector } of relevantVectors) {
      // Puntuación Semántica
      const semanticScore = TextUtils.cosineSimilarity(questionVector, vector);

      // Puntuación de Palabras Clave
      const doc = this.knowledgeMap.get(id);
      if (!doc) continue;
      const docText = `${doc.content} ${doc.tags.join(' ')}`;
      const keywordScore = TextUtils.calculateKeywordScore(userQuestion, docText);

      // Puntuación Híbrida Ponderada
      const hybridScore = semanticScore * 0.6 + keywordScore * 0.4;

      // console.log(
      //   `- ID: ${id}, Semántica: ${semanticScore.toFixed(4)}, Keyword: ${keywordScore.toFixed(
      //     4
      //   )}, Híbrida: ${hybridScore.toFixed(4)}`
      // );

      if (hybridScore > bestScore) {
        bestScore = hybridScore;
        bestId = id;
      }
    }

    // console.log(`--- Mejor resultado en tipo ${type}: { id: '${bestId}', score: ${bestScore.toFixed(4)} } ---`);
    return { score: bestScore, id: bestId };
  }
}
