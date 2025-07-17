import Productos from "../models/products.models.js";


export const obtenerTodosLosProductos = async (_req, res) => {
  try {
    const productos = await Productos.devolverTodos();

    console.log("Productos obtenidos:", productos);

    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar obtener productos";
    res.status(500).json(error);
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEncontrado = await Productos.buscarPorId(id);

    if (!productoEncontrado)
      return res
        .status(404)
        .json({ error: `No se encontró el producto con ID: ${id}` });

    res.status(200).json(productoEncontrado);
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar obtener el producto";
    res.status(500).json(error);
  }
};

export const crearProducto = async (req, res) => {
  try {

    const datos = req.body;
    if (!datos.nombre || !datos.categoria || !datos.imagen || !datos.precio)
      return res
        .status(400)
        .json({ error: `Faltan datos para crear el producto` });

    const creado = await Productos.crearUno(datos);

    if (creado)
      return res.status(201).json({ mensaje: `Producto creado con éxito` });

    return res
      .status(500)
      .json({ error: `Hubo un error al intentar crear el producto` });
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar crear producto";
    res.status(500).json(error);
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const infoNueva = req.body;

  try {
    const infoExistente = await Productos.buscarPorId(id);

    if (!infoExistente) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const actualizado = await Productos.actualizarUno(infoExistente, infoNueva);

    if (actualizado) {
      return res.status(200).json({ mensaje: "Producto actualizado con éxito" });
    } else {
      return res.status(500).json({ error: "Error al actualizar el producto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
};


export const eliminarProducto = async (req, res) => {
  try {
    console.log("premetodo");
    const { id } = req.params;

    const productoEncontrado = await Productos.buscarPorId(id);

    if (!productoEncontrado)
      return res.status(404).json({ error: `No existe producto con ese ID` });

      console.log("premetodo");
    const eliminado = await Productos.borrarUno(id);

    if (eliminado)
      return res.status(200).json({ mensaje: `Producto eliminado con éxito` });

    return res
      .status(500)
      .json({ error: `Hubo un error al intentar eliminar el producto` });
  } catch (error) {
    console.error(error);
    error.message = "Error al intentar eliminar producto";
    res.status(500).json(error);
  }
};
