import SibApiV3Sdk from '@/utils/brevo';
import rateLimit from 'express-rate-limit';

// Configuración de la limitación de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 2, // Limita cada IP a 2 solicitudes por ventana de 15 minutos
  message: 'Too many requests from this IP, please try again later.',
});

export default async function handler(req, res) {
  // Aplicar limitación de tasa
  limiter(req, res, async () => {
    // Validación de origen
    // const allowedOrigins = ['https://salmed.net', 'https://www.salmed.net'];
    // const origin = req.headers.origin;

    // if (!allowedOrigins.includes(origin)) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    if (req.method === 'POST') {
      const { fullname, email, phone, message } = req.body;

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.to = [{ email: 'salmed.platform@gmail.com' }];
      //sendSmtpEmail.to = [{ email: email }];

      sendSmtpEmail.sender = { email: 'salmed.platform@gmail.com', name: 'Salmed.net' };
      sendSmtpEmail.subject = `Nuevo mensaje de "${fullname}" desde Formulario de Contacto`;
      sendSmtpEmail.textContent = `
      Nombre: ${fullname}
      Email: ${email}
      Teléfono: ${phone}
      Mensaje: ${message}
    `;
      sendSmtpEmail.htmlContent = `
      <h2><strong>Mensaje de "${fullname}" enviado desde el Formulario de Contacto en salmed.net</strong></h2>
      <br>
      <hr>     
      <p><strong>DATOS DEL FORMULARIO:</strong></p>     
      <p><strong>Nombre:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
      <hr>
       <br>
      <h3>Por favor, no responder a este mensaje.</h3>
      <h3>Para responder a "${fullname}", escriba a ${email}</h3>
    `;

      try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        res.status(200).json({ message: 'Email sent successfully', data });
      } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
