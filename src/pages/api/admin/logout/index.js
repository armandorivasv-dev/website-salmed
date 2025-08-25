import { serialize } from 'cookie';

export default function handler(req, res) {
  // 1. Validar que el método sea POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2. Serializar la cookie con un valor vacío y maxAge: 0 para eliminarla
  const cookie = serialize('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Esto le indica al navegador que elimine la cookie inmediatamente
  });

  // 3. Establecer el encabezado 'Set-Cookie' en la respuesta
  res.setHeader('Set-Cookie', cookie);

  // 4. Enviar la respuesta de éxito
  return res.status(200).json({ success: true });
}
