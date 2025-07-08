const db = require('../models/db');
const Producto = require('../models/Producto');




// Listar todos los productos y mostrar en dashboard
exports.listarProductos = async (req, res) => {
  try {
    const resultado = await Producto.obtenerTodos();
    if (resultado.success) {
      res.render('dashboard', { productos: resultado.data });
    } else {
      console.error(resultado.error);
      res.send('Error al obtener productos');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inesperado');
  }
};




// Crear producto nuevo (recibe datos del formulario)
exports.mostrarFormularioProducto = (req, res) => {

  console.log('Entrando a mostrarFormularioProducto');
  res.render('altaProducto');
  
};



exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    await Producto.crear({ nombre, precio, tipo, imagen });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error creando producto:', error);
    res.send('Error al crear producto');
  }
};


exports.bajaLogicaProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await Producto.darBaja(id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al dar de baja:', error);
    res.status(500).send('Error al dar de baja el producto');
  }
};


exports.darAltaProducto = async (req, res) => {
  const id = req.params.id;

  try {
    await Producto.DarAlta(id, 1);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al dar de alta el producto:', error);
    res.status(500).send('Error al activar el producto');
  }
};




// Mostrar formulario con datos del producto para editar
exports.mostrarFormularioEdicion = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await Producto.obtenerPorId(id);
    console.log(resultado,'resultado');
    if (resultado.success && resultado.data.length > 0) {
      const producto = resultado.data[0];
      res.render('altaProducto', { producto }); // Enviamos el producto para precargar el formulario
    } else {
      res.send('Producto no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener producto');
  }
};

// Procesar la edición del producto
exports.editarProducto = async (req, res) => {
  const id = req.params.id;
  const { nombre, precio, tipo } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Aquí puedes llamar a un método en Producto que actualice el producto por ID
    await Producto.modificar(id, { nombre, precio, tipo, imagen });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al editar producto:', error);
    res.send('Error al editar producto');
  }
};
