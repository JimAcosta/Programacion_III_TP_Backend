import conexion from "../database/db.js";


export default class Productos {
  static devolverTodos = async () => {

  const sql = `SELECT * FROM productos`;
  const { rows } = await conexion.query(sql);
  return rows;
};

  static buscarPorId = async (id) => {
  const sql = `SELECT * FROM productos WHERE id = $1`;

  

  const { rows } = await conexion.query(sql, [id]);
  console.log("El resultado es: ", rows );

  return rows[0];
};


  static crearUno = async (producto) => {
  if (
    producto.nombre &&
    producto.categoria &&
    producto.imagen &&
    producto.precio
  ) {
    const sql = `INSERT INTO productos (nombre,categoria,imagen,precio,esta_activo)VALUES ($1, $2, $3, $4, $5)`;
    const resultado = await conexion.query(sql, [
      producto.nombre,
      producto.categoria,
      producto.imagen,
      producto.precio,
      false,
    ]);

    return resultado.rowCount > 0;
  }

  return false;
};



  static actualizarUno = async (infoExistente, infoNueva) => {
  const sql = `
    UPDATE productos
    SET nombre = $1,
        imagen = $2,
        precio = $3,
        categoria = $4,
        esta_activo = $5
    WHERE id = $6
  `;

  const valores = [
    infoNueva.nombre ?? infoExistente.nombre,
    infoNueva.imagen ?? infoExistente.imagen,
    infoNueva.precio ?? infoExistente.precio,
    infoNueva.categoria ?? infoExistente.categoria,
    infoNueva.esta_activo ?? infoExistente.esta_activo,
    infoExistente.id,
  ];

  const resultado = await conexion.query(sql, valores);

  return resultado.rowCount > 0;
};



  static borrarUno = async (id) => {

  const sql = `UPDATE productos SET esta_activo = FALSE WHERE id = $1`;
  const resultado = await conexion.query(sql, [id]);

  return resultado.rowCount > 0;
};


}