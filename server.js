require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Si usás 'public/' en raíz
app.use(express.static(path.join(__dirname, 'public')));

// Configurar motor de vistas si usás EJS, Pug, etc.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Usar rutas
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
