const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const mainController = require('../controllers/main.controller');

const Denuncia = require('../models/denuncia.model');
const { enviarCorreoDenuncia } = require('../services/email.service');

router.get('/', mainController.mostrarindex);

router.post('/enviar', upload.none(), async (req, res) => {
  const denuncia = new Denuncia(req.body);

  try {
    await enviarCorreoDenuncia(denuncia);
    res.json({ success: true, message: '¡Tu denuncia fue enviada!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al enviar denuncia' });
  }
});

module.exports = router;
