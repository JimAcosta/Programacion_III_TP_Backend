export default class ProductoVendido {
  static crearMuchos = async (productosVendidos, conexion) => {
    await conexion.query(
      `INSERT INTO sale_items (saleId, productId, cantidad, productPrice, productName) VALUES ?`,
      [productosVendidos]
    );
  };
}
