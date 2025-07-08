const Usuario = require('../models/usuario');


exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  const resultado = await Usuario.verificarCredenciales(usuario, password);

  console.log(resultado.success,resultado.data);
  if (resultado.success && resultado.data) {
    res.redirect('/admin/dashboard'); // 🚨 esto es fundamental
  } else {
    res.render('login', { mensajeError: 'Credenciales incorrectas' });
  }
};

