import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_EXPIRY = '1h';

export class AuthUtils {
  static async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  static async verifyPassword(password, storedHash) {
    try {
      const hashedPassword = await this.hashPassword(password);
      return hashedPassword === storedHash;
    } catch (error) {
      console.error('Error verificando contraseña:', error);
      return false;
    }
  }

  static async createToken(payload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(JWT_SECRET);
  }

  static async verifyToken(token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload;
    } catch {
      return null;
    }
  }

  static async verifyCredentials(username, password) {
    const validUsername = process.env.ADMIN_USERNAME;
    const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    // console.log('🔍 Verificando credenciales:');
    // console.log(`Username recibido: "${username}"`);
    // console.log(`Username válido: "${validUsername}"`);
    // console.log(`Hash original: "${validPasswordHash}"`);
    // console.log(`Hash length: ${validPasswordHash?.length ?? 'undefined'}`);

    if (username !== validUsername) {
      console.log('❌ Username no coincide');
      return false;
    }

    if (!validPasswordHash || validPasswordHash.trim() === '') {
      console.log('❌ Hash de contraseña no configurado o vacío');
      return false;
    }

    try {
      const isValidPassword = await this.verifyPassword(password, validPasswordHash);
      console.log(`Password válido: ${isValidPassword}`);
      return isValidPassword;
    } catch (error) {
      console.error('❌ Error verificando contraseña:', error);
      return false;
    }
  }
}
