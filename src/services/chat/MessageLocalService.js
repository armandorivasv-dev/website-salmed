import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'pages', 'api', 'chat-messages');
const DATA_FILE = path.join(DATA_DIR, 'data.js');
const MAX_MESSAGE_SIZE = parseInt(process.env.MAX_MESSAGE_SIZE ?? '10485760'); // 10MB
const MAX_PERSISTED_MESSAGES = 100; // Para rotación (últimos N en archivo principal)

export class MessageLocalService {
  static ensureDataDirectory = async () => {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  };

  static readExistingMessages = async () => {
    try {
      const content = await fs.readFile(DATA_FILE, 'utf-8');
      const start = content.indexOf('[');
      const end = content.lastIndexOf(']');
      if (start === -1 || end === -1) return [];
      const arraySlice = content.slice(start, end + 1);
      return JSON.parse(arraySlice);
    } catch {
      return [];
    }
  };

  static writeMessagesFile = async (messages) => {
    const fileContent = `export const messages = ${JSON.stringify(messages, null, 2)};\n`;
    await fs.writeFile(DATA_FILE, fileContent, 'utf-8');
  };

  static rotateMessages = async (messages) => {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const archiveFile = path.join(DATA_DIR, `data-${timestamp}.archive.js`);
      const archiveContent = `export const messages = ${JSON.stringify(messages, null, 2)};\n`;
      await fs.writeFile(archiveFile, archiveContent, 'utf-8');
      const recentMessages = messages.slice(-MAX_PERSISTED_MESSAGES);
      await this.writeMessagesFile(recentMessages);
    } catch (error) {
      console.error('Error rotando mensajes:', error);
    }
  };

  static message = async (data) => {
    if (process.env.MESSAGES_ENABLED !== 'true') return;

    try {
      await this.ensureDataDirectory();

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

      const messages = await this.readExistingMessages();

      messages.push(dataMessage);

      const prospectiveContent = `export const messages = ${JSON.stringify(messages, null, 2)};\n`;
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
      await this.ensureDataDirectory();
      const messages = await this.readExistingMessages();
      return messages.slice(-limit).reverse();
    } catch {
      return [];
    }
  };
}
