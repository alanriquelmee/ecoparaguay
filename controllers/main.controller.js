const Denuncia = require('../models/denuncia.model');
const { enviarCorreoDenuncia } = require('../services/email.service');

exports.mostrarindex = (req, res) => {
    res.render('index', {googleApiKey: process.env.GOOGLE_MAPS_API_KEY});  // renderiza views/index.ejs
};
    
exports.recibirDatos = async (req, res) => {
  const denuncia = new Denuncia(req.body);
  try {
    await enviarCorreoDenuncia(denuncia);
    res.render('respuesta', { denuncia });
  } catch (err) {
    console.error('Error enviando email:', err);
    res.status(500).send('Error al enviar email');
  }
};
