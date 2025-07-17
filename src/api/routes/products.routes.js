import { Router } from "express";
import { validacionId } from "../middlewares/middlewares.js";
import {
  crearProducto,
  eliminarProducto,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  actualizarProducto
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", validacionId, obtenerProductoPorId);
router.post("/", crearProducto);
router.put("/:id", validacionId, actualizarProducto);
router.delete("/:id", validacionId, eliminarProducto);

export default router;