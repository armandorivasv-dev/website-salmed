// /pages/api/login.js (o la ruta que corresponda)

import { serialize } from 'cookie';
import { AuthUtils } from '@/utils/AuthUtils';
// Asumo que AuthUtils es una utilidad que has creado. La importación se mantiene.
// import AuthUtils from '../../utils/auth';

export default async function handler(req, res) {
  // 1. Validar que el método sea POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 2. Leer el cuerpo de la petición. Next.js ya lo parsea a JSON.
    const { username, password } = req.body;

    // console.log('🔐 Intento de login:');
    // console.log(`Username: "${username}"`);
    // console.log(`Password: "${password}"`);

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    // La lógica de negocio no cambia
    const isValid = await AuthUtils.verifyCredentials(username, password);

    if (!isValid) {
      //console.log('❌ Credenciales inválidas');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // La creación del token no cambia
    const token = await AuthUtils.createToken({
      username,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
    });

    //console.log('🍪 Configurando cookie con token:', token.substring(0, 20) + '...');

    // 3. Crear la cookie serializada para el encabezado HTTP
    const cookie = serialize('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hora
      path: '/',
    });

    // 4. Establecer el encabezado 'Set-Cookie' en la respuesta
    res.setHeader('Set-Cookie', cookie);

    //console.log('✅ Login exitoso, cookie configurada');

    // 5. Enviar la respuesta de éxito
    return res.status(200).json({
      success: true,
      message: 'Autenticación exitosa',
    });
  } catch (error) {
    console.error('💥 Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
