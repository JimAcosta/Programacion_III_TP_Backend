import { Router } from "express";
import { validacionId } from "../middlewares/middlewares.js";
import { crearVenta,obtenerTodasLasVentas, obtenerVentaPorId } from "../controllers/sales.controllers.js";
const router = Router();

router.get("/",obtenerTodasLasVentas );
router.get("/:id", validacionId,obtenerVentaPorId );
router.post("/", crearVenta);

export default router;