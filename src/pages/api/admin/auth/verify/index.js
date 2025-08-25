import { jwtVerify } from 'jose';

// La definición del secreto JWT se mantiene igual
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function handler(req, res) {
  // 1. Validar el método HTTP. En Pages Router se hace dentro del handler.
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 2. Leer la cookie desde el objeto `req`. La sintaxis es más simple.
    const token = req.cookies['admin-token']; // Usamos [] por el guion en el nombre

    // console.log('🔍 Verificando token de auth...');
    // console.log('Token recibido:', token ? token.substring(0, 20) + '...' : 'No token');
    // console.log('Cookies disponibles:', Object.keys(req.cookies));

    if (!token) {
      console.log('❌ No se encontró token en las cookies');
      // 3. Enviar respuesta JSON usando el objeto `res`
      return res.status(401).json({ error: 'No token provided' });
    }

    console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);

    // La lógica de verificación del token no cambia
    const { payload } = await jwtVerify(token, JWT_SECRET);
    //console.log('✅ Token válido, payload:', payload);

    // 4. Enviar respuesta de éxito con `res`
    return res.status(200).json({
      success: true,
      user: {
        username: payload.username,
        role: payload.role,
      },
    });
  } catch (error) {
    //console.error('❌ Error verificando token:', error.message);
    // 5. Enviar respuesta de error con `res`
    return res.status(401).json({ error: 'Invalid token' });
  }
}
