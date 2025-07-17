CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(255),
    imagen VARCHAR(255),
    esta_activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE ventas (
  id INT(11) NOT NULL AUTO_INCREMENT,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  nombreCliente VARCHAR(255),
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE items_venta (
  id INT(11) NOT NULL AUTO_INCREMENT,
  idVenta INT(11) NOT NULL,
  idProducto INT(11) NOT NULL,
  cantidad INT(11) NOT NULL,
  precioProducto DECIMAL(10,2) NOT NULL,
  nombreProducto VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_idVenta (idVenta),
  KEY idx_idProducto (idProducto)
);