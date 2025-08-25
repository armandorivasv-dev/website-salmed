import crypto from 'crypto';

const generateSHA256Hash = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const password = process.argv[2] || 'YOUR_PASSWORD';

console.log(`🔒 Generando hash SHA-256 para la contraseña: "${password}"`);
const hash = generateSHA256Hash(password);
console.log(`✅ Hash generado:`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);

// Verificar que solo contiene números y letras
const hasOnlySafeChars = /^[a-zA-Z0-9]+$/.test(hash);
console.log(`🔍 Verificación de caracteres seguros: ${hasOnlySafeChars ? '✅ Correcto' : '❌ Error'}`);

console.log(`\n📋 Copia esta línea en tu .env.local:`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
