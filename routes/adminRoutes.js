const express = require('express');
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');


const router = express.Router();

// Configuración multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');  // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const nombreFinal = Date.now() + path.extname(file.originalname); // Nombre único con timestamp + extensión original
    cb(null, nombreFinal);
  }
});
const upload = multer({ storage });

/** ---------- Rutas CRUD para productos ---------- **/

// 1. Mostrar panel con todos los productos (Dashboard)
router.get('/dashboard', adminController.listarProductos);

console.log('antesruta');
// Mostrar formulario para agregar producto
router.get('/producto/nuevo', adminController.mostrarFormularioProducto);
console.log('despuesruta');
// Procesar formulario y crear producto
router.post('/producto/nuevo', upload.single('imagen'), adminController.crearProducto);

router.post('/producto/baja/:id', adminController.bajaLogicaProducto);


router.post('/producto/alta/:id', adminController.darAltaProducto);



// Mostrar formulario para editar producto
router.get('/producto/editar/:id', adminController.mostrarFormularioEdicion);


// Procesar edición del producto
router.post('/producto/editar/:id', upload.single('imagen'), adminController.editarProducto);





module.exports = router;
