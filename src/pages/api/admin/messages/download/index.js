import { MessageBlobService } from '@/services/chat/MessageBlobService';
import { MessageLocalService } from '@/services/chat/MessageLocalService.js';
import { AuthUtils } from '@/utils/AuthUtils';

async function verifyAdminAuth(req) {
  // La lectura de cookies usa la sintaxis de Pages Router.
  const token = req.cookies['admin-token'];
  if (!token) return false;

  try {
    const payload = await AuthUtils.verifyToken(token);
    return payload?.role === 'admin';
  } catch (error) {
    // Si el token es inválido (expirado, malformado), verifyToken fallará.
    return false;
  }
}

// 2. Esta función es pura lógica de JS, no necesita cambios.
function convertToCSV(messages) {
  if (!messages.length) return 'Sin datos disponibles\n';

  const headers = ['Fecha', 'Hora', 'IP Usuario', 'Pregunta Usuario', 'Respuesta Sistema', 'Tiempo Respuesta (ms)'];

  const csvContent = [
    headers.join(','),
    ...messages.map((message) =>
      [
        `"${message.date}"`,
        `"${message.hour}"`,
        `"${message.user_ip}"`,
        `"${message.user_question?.replace(/"/g, '""') || ''}"`,
        `"${message.system_response?.replace(/"/g, '""') || ''}"`,
        `"${message.system_response_time || 0}"`,
      ].join(',')
    ),
  ].join('\n');

  return csvContent;
}

export default async function handler(req, res) {
  // 3. Validar el método HTTP
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 4. Usar la función helper adaptada
    if (!(await verifyAdminAuth(req))) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const messages = process.env.VERCEL === '1'
      ? await MessageBlobService.getMessages(1000)
      : await MessageLocalService.getMessages(1000);

    const csvContent = convertToCSV(messages);
    const fileName = `messages-${new Date().toISOString().split('T')[0]}.csv`;

    // 5. Establecer los encabezados en el objeto `res` para la descarga
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // 6. Enviar el contenido del CSV como respuesta y finalizar la petición
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error descargando mensajes:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
