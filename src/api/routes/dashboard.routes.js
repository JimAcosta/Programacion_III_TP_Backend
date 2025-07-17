import { Router } from "express";
import { validacionId } from "../middlewares/middlewares.js";

import {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  obtenerTodasLasVentas,
  nuevoProducto,
  editarProducto,
  obtenerDetalleVenta,
} from "../controllers/views.controllers.js";

const router = Router();

// Dashboard inicial
router.get("/", obtenerTodosLosProductos);

// Buscar producto por id
router.get("/get-product", obtenerProductoPorId);

// Nuevo producto
router.get("/new-product", nuevoProducto);

// Editar producto
router.get("/edit-product/:id", editarProducto);

// Ventas
router.get("/sales", obtenerTodasLasVentas);

// Detalle de Venta
router.get("/sales/details/:id", validacionId, obtenerDetalleVenta);

export default router;