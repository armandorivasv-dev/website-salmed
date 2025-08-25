import { AuthUtils } from '@/utils/AuthUtils.js';
import { MessageLocalService } from '@/services/chat/MessageLocalService.js';

async function verifyAdminAuth(req) {
  // Leer la cookie desde `req.cookies`
  const token = req.cookies['admin-token'];
  if (!token) return false;

  try {
    const payload = await AuthUtils.verifyToken(token);
    return payload?.role === 'admin';
  } catch (error) {
    // Si `verifyToken` falla (token inválido/expirado), se considera no autorizado.
    return false;
  }
}

// --- API Route Handler ---
export default async function handler(req, res) {
  // 1. Validar el método HTTP
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 2. Realizar la autenticación usando la función helper adaptada
    if (!(await verifyAdminAuth(req))) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    // 3. Leer los parámetros de la URL desde `req.query`
    const { limit: limitParam } = req.query;
    const limit = parseInt(limitParam || '100', 10); // `10` es el radix (base numérica)

    // La lógica para obtener los logs no cambia
    const messages = await MessageLocalService.getMessages(limit);

    // 4. Enviar la respuesta JSON usando `res.status().json()`
    return res.status(200).json({
      success: true,
      messages,
      total: messages.length,
    });
  } catch (error) {
    console.error('Error obteniendo logs:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
