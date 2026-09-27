import conexion from "../database/db.js";

export default class Ventas {

  // Devuelve todas las ventas
  static devolverTodos = async () => {
    const sql = `SELECT * FROM ventas`;

    const { rows } = await conexion.query(sql);

    return rows;
  };


  // Buscar venta por id con sus items
  static buscarVentaPorId = async (id) => {

    // Obtener venta
    const { rows: ventas } = await conexion.query(
      `SELECT id, fecha, total, "nombreCliente"
       FROM ventas
       WHERE id = $1`,
      [id]
    );

    if (ventas.length === 0) {
      return null;
    }

    // Obtener items de la venta
    const { rows: items } = await conexion.query(
      `SELECT "idProducto",
              "nombreProducto",
              cantidad,
              "precioProducto"
       FROM items_venta
       WHERE "idVenta" = $1`,
      [id]
    );

    // Armar objeto completo
    const ventaCompleta = ventas[0];

    ventaCompleta.items = items;

    return ventaCompleta;
  };


  // Crear venta con items usando transacción
  static crearVenta = async (venta) => {

    if (
      !venta.total ||
      !venta.items?.length ||
      !venta.nombreCliente
    ) {
      return null;
    }

    const client = await conexion.connect();

    try {

      await client.query("BEGIN");

      // Insertar venta
      const resultadoVenta = await client.query(
        `INSERT INTO ventas ("total", "nombreCliente")
         VALUES ($1, $2)
         RETURNING id`,
        [
          venta.total,
          venta.nombreCliente
        ]
      );

      const idVenta = resultadoVenta.rows[0].id;

      // Insertar items
      for (const item of venta.items) {

        await client.query(
          `INSERT INTO items_venta
           ("idVenta", "idProducto", cantidad, "precioProducto", "nombreProducto")
           VALUES ($1, $2, $3, $4, $5)`,
          [
            idVenta,
            item.idProducto,
            item.cantidad,
            item.precioProducto,
            item.nombreProducto
          ]
        );

      }

      await client.query("COMMIT");

      return idVenta;

    } catch (error) {

      await client.query("ROLLBACK");

      console.error("Error al crear la venta:", error);

      return null;

    } finally {

      client.release();

    }
  };
}
