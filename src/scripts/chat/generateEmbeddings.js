import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from '@xenova/transformers';
import { TextUtils } from '../../utils/textUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_PATH = path.resolve(__dirname, '../../knowledge/knowledge.json');
const VECTORS_PATH = path.resolve(__dirname, '../../knowledge/vectors.json');
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

const generateEmbeddings = async () => {
  try {
    const knowledgeData = await fs.readFile(KNOWLEDGE_PATH, 'utf-8');
    const knowledge = JSON.parse(knowledgeData);

    const embedder = await pipeline('feature-extraction', MODEL_NAME);

    const vectors = [];
    for (const { id, content, tags } of knowledge) {
      const normalizedContent = TextUtils.normalize(content);
      const normalizedTags = tags ? tags.map(TextUtils.normalize).join(' ') : '';

      const enrichedText = `${normalizedContent} ${normalizedTags}`.trim();

      const output = await embedder(enrichedText, { pooling: 'mean', normalize: true });
      vectors.push({ id, vector: [...output.data] });
    }

    await fs.writeFile(VECTORS_PATH, JSON.stringify(vectors, null, 2));
    console.log(`✅ Embeddings generados y guardados en ${VECTORS_PATH}`);
  } catch (error) {
    console.error('❌ Error generando embeddings:', error);
  }
};

generateEmbeddings();
