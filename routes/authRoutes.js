const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// Ruta de inicio (pantalla con botones)
router.get('/', (req, res) => {
    
    res.render('inicio');
});


// Mostrar formulario login
// Ruta GET /login (para mostrar el formulario sin errores)
router.get('/login', (req, res) => {
  res.render('login', { mensajeError: null }); // 👈 esta línea previene el error
});

// Procesar login
router.post('/login', authController.login);
module.exports = router;
