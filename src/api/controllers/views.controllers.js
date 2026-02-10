import Productos from "../models/products.models.js";
import Ventas from "../models/sales.models.js";
import { FormateadorNumero } from "../utils/numberFormatter.js";

export const obtenerTodosLosProductos = async (req, res) => {
  try {
    const productos = await Productos.devolverTodos();

    // Formateo del precio de venta
    productos.forEach((producto) => {
      producto.price = FormateadorNumero.format(producto.price);
    });

    res.render("index", {
      title: "Panel - Tech Shop",
      productos,
    });
  } catch (error) {
    console.error("Error obteniendo la información", error.message);
    res.status(500).json({
      error: "Error interno al obtener la información",
    });
  }
};


export const obtenerProductoPorId = async (req, res) => {
  // Mostramos la vista en /dashboard/get-products
  res.render("get-product", {
    title: "Consultar productos - Tech Shop",
  });
};

export const nuevoProducto = async (req, res) => {
  // Mostramos la vista en /dashboard/new-product
  res.render("new-product", {
    title: "Nuevo producto - Panel Tech Shop",
  });
};

export const editarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.buscarPorId(id);
    // Mostramos la vista en /dashboard/edit-product
    res.render("edit-product", {
      title: "Editar producto - Tech Shop",
      producto,
    });
  } catch (error) {
    console.error("Error obteniendo la información", error.message);
    res.status(500).json({
      error: "Error interno al obtener la información",
    });
  }
};

export const obtenerTodasLasVentas = async (req, res) => {
  try {
    const ventas = await Ventas.devolverTodos();

    // Formateo de fecha y total de venta
    ventas.forEach((venta) => {
      venta.total = FormateadorNumero.format(venta.total);
      venta.fecha = venta.fecha.toLocaleDateString("es-AR");
    });

    res.render("sales", {
      title: "Ventas - Tech Shop",
      ventas,
    });
  } catch (error) {
    console.error("Error obteniendo la información", error.message);
    res.status(500).json({
      error: "Error interno al obtener la indsfdfformación",
    });
  }
};

export const obtenerDetalleVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const detalleVenta = await Ventas.buscarVentaPorId(id);

    if (!detalleVenta) {
      return res.status(404).send("Venta no encontrada");
    }
    // Convierte la fecha a Date
    detalleVenta.fecha = detalleVenta.fecha ? new Date(detalleVenta.fecha) : null;

    // Formateo del total
    detalleVenta.total = FormateadorNumero.format(detalleVenta.total);

    // Formateo de cada ítem
    detalleVenta.items.forEach((item) => {
      item.subtotal = FormateadorNumero.format(item.cantidad * item.precioProducto);
      item.productPrice = FormateadorNumero.format(item.productPrice);
    });

    res.render("sale-details", {
      title: "Detalle de venta - Panel Tech Shop",
      detalleVenta,
    });
  } catch (error) {
    console.error("Error obteniendo la información", error.message);
    res.status(500).json({
      error: "Error interno al obtener la información",
    });
  }
};

