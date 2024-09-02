require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');

if (!process.env.NEXT_PUBLIC_BREVO_API_KEY) {
  throw new Error('La variable de entorno NEXT_PUBLIC_BREVO_API_KEY no está definida');
}

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

module.exports = SibApiV3Sdk;

// const apiKey = new SibApiV3Sdk.ApiKeyAuth('api-key', process.env.NEXT_PUBLIC_BREVO_API_KEY);
// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

// module.exports = SibApiV3Sdk;
