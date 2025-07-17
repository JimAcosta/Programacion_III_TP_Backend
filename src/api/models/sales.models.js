import conexion from "../database/db.js";

export default class Ventas {
  // Devuelve todas las ventas (sin items)
  static devolverTodos = async () => {
    const sql = `SELECT * FROM ventas`;
    const [resultado] = await conexion.query(sql);
    return resultado;
  };

  // Buscar venta por id con sus items
  static buscarVentaPorId = async (id) => {
    // Obtener venta
    const [ventas] = await conexion.query(
      `SELECT id, fecha, total, nombreCliente FROM ventas WHERE id = ?`,
      [id]
    );

    if (ventas.length === 0) return null;

    // Obtener items de la venta
    const [items] = await conexion.query(
      `SELECT idProducto, nombreProducto, cantidad, precioProducto FROM items_venta WHERE idVenta = ?`,
      [id]
    );

    // Armar objeto completo
    const ventaCompleta = ventas[0];
    ventaCompleta.items = items;

    return ventaCompleta;
  };

  // Crear venta con items usando transacción
  static crearVenta = async (venta) => {
    console.log("llegaaca");
    if (!venta.total || !venta.items?.length || !venta.nombreCliente) {
      return null;
    }

    const conn = await conexion.getConnection();

    try {
      await conn.beginTransaction();

      // Insertar venta
      const [resultadoVenta] = await conn.query(
        `INSERT INTO ventas (total, nombreCliente) VALUES (?, ?)`,
        [venta.total, venta.nombreCliente]
      );
      const idVenta = resultadoVenta.insertId;

      // Preparar items para insertarlos
      const itemsData = venta.items.map(item => [
        idVenta,
        item.idProducto,
        item.cantidad,
        item.precioProducto,
        item.nombreProducto
      ]);

      // Insertar items
      const sqlItems = `
        INSERT INTO items_venta 
        (idVenta, idProducto, cantidad, precioProducto, nombreProducto) 
        VALUES ?`;

      await conn.query(sqlItems, [itemsData]);

      await conn.commit();
      conn.release();

      return idVenta;

    } catch (error) {
      await conn.rollback();
      conn.release();
      console.error("Error al crear la venta:", error);
      return null;
    }
  };
}
