const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function enviarCorreoDenuncia(denuncia) {
  const msg = {
    to: process.env.EMAIL_DESTINO,           // Receptor
    from: process.env.EMAIL_REMITENTE,       // Verificado en SendGrid
    subject: 'Nueva Denuncia Recibida',
    html: `
      <h2>Datos de Denuncia</h2>
      <ul>
        <li><strong>Tipo:</strong> ${denuncia.tipo}</li>
        <li><strong>Nombre:</strong> ${denuncia.nombre}</li>
        <li><strong>Email:</strong> ${denuncia.email}</li>
        <li><strong>Ubicación:</strong> ${denuncia.ubicacion}</li>
        <li><strong>Descripción:</strong> ${denuncia.descripcion}</li>
        <li><strong>Fecha:</strong> ${denuncia.fecha}</li>
      </ul>
    `
  };

  return sgMail.send(msg);
}

module.exports = { enviarCorreoDenuncia };
