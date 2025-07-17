import Ventas from "../models/sales.models.js";

import { FormateadorNumero } from "../utils/numberFormatter.js";

export const obtenerTodasLasVentas = async (_req, res) => {
  try {
    res.status(200).json(await Ventas.devolverTodos());
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar obtener ventas";
    res.status(500).json(error);
  }
};

export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const ventaEncontrada = await Ventas.buscarVentaPorId(id);
    if (!ventaEncontrada)
      return res
        .status(404)
        .json({ error: `No encontramos la venta con id: ${id}` });

    res.status(200).json(ventaEncontrada);
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar obtener la venta";
    res.status(500).json(error);
  }
};

export const crearVenta = async (req, res) => {
  try {
    const datos = req.body;

    if (!datos.nombreCliente || !datos.items.length || !datos.total)

      return res
        .status(400)
        .json({ error: `Nos faltan datos para crear la venta` });

    const idCreado = await Ventas.crearVenta(datos);
    if (idCreado) return res.status(201).json({ id: idCreado });

    return res
      .status(500)
      .json({ error: `Hubo un error al intentar crear la venta` });
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar crear venta";
    res.status(500).json(error);
  }
};
