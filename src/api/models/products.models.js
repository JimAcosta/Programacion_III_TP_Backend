import conexion from "../database/db.js";


export default class Productos {
  static devolverTodos = async () => {
    let sql = `SELECT * FROM productos`;
    const [rows] = await conexion.query(sql);
    return rows;
  };

  static buscarPorId = async (id) => {
    let sql = `SELECT * FROM productos WHERE id = ?`;
    const [resultado] = await conexion.query(sql, [id]);
    return resultado[0];
  };

  static crearUno = async (producto) => {
  console.log("producto", producto);

  if (producto.nombre &&producto.categoria &&producto.imagen && producto.precio) {
    const sql = `INSERT INTO productos (nombre, categoria, imagen, precio , esta_activo) VALUES (?, ?, ?, ?, ?)`;

    const [resultado] = await conexion.query(sql, [
      producto.nombre,    
      producto.categoria, 
      producto.imagen,    
      producto.precio,
      false     
    ]);
    return resultado.affectedRows > 0;
  }

  return false;
};


  static actualizarUno = async (infoExistente, infoNueva) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, precio = ?, categoria = ?, esta_activo = ?
        WHERE id = ?
    `;
    const [resultado] = await conexion.query(sql, [
      infoNueva.nombre ?? infoExistente.nombre,
      infoNueva.imagen ?? infoExistente.imagen,
      infoNueva.precio ?? infoExistente.precio,
      infoNueva.categoria ?? infoExistente.categoria,
      infoNueva.esta_activo ?? infoExistente.esta_activo,
      infoExistente.id,
    ]);
    return resultado.affectedRows > 0;
  };

  static borrarUno = async (id) => {
    console.log("Entra al metodo");
    let sql = `
        UPDATE productos
        SET esta_activo = 0
        WHERE id = ?
    `;
    const [resultado] = await conexion.query(sql, [id]);
    console.log("sale metodo");
    return resultado.affectedRows > 0;
  };
}