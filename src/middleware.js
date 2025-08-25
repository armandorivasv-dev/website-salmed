// /middleware.js (o /src/middleware.js)

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Asegúrate de tener JWT_SECRET en tus variables de entorno (.env.local)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // En Pages Router, el middleware se ejecuta en todas las rutas.
  // Por eso, es crucial filtrar las rutas que queremos proteger aquí dentro.
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    // Dejar pasar las rutas de API y las internas de Next.js sin procesar
    return NextResponse.next();
  }

  // Lógica de protección para las rutas de admin
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      // Es importante usar la URL completa en la redirección
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next(); // El token es válido, permite el acceso
    } catch (error) {
      console.error('❌ Token inválido en middleware:', error.message);
      // Si el token es inválido, redirigir a login y eliminar la cookie corrupta
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin-token');

      return response;
    }
  }

  // Para todas las demás rutas que no son de admin, permite el paso
  return NextResponse.next();
}
