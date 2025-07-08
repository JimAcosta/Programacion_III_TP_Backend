const db = require('./db');

const Producto = {
  obtenerTodos: async () => {
    const sql = 'SELECT * FROM productos';
    try {
      const [results] = await db.query(sql);
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error };
    }
  },

  crear: (producto) => {
    const { nombre, precio, tipo, imagen } = producto;
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO productos (nombre, precio, tipo, imagen, activo) VALUES (?, ?, ?, ?, 1)';
      db.query(sql, [nombre, precio, tipo, imagen], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  
  darBaja: (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE productos SET activo = 0 WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
},


DarAlta: (id, nuevoEstado) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE productos SET activo = ? WHERE id = ?';
    db.query(sql, [nuevoEstado, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
},


  // Obtener producto por ID
    obtenerPorId: async (id) => {
    const sql = 'SELECT * FROM productos WHERE id = ?';
    try {
        const [results] = await db.query(sql, [id]);
        return { success: true, data: results };
    } catch (error) {
        return { success: false, error };
    }
    },

// Modificar producto por ID
modificar: (id, producto) => {
  return new Promise((resolve, reject) => {
    const { nombre, precio, tipo, imagen } = producto;
    let sql = '';
    let params = [];

    if (imagen) {
      sql = 'UPDATE productos SET nombre = ?, precio = ?, tipo = ?, imagen = ? WHERE id = ?';
      params = [nombre, precio, tipo, imagen, id];
    } else {
      // Si no se subió imagen, no la modificamos
      sql = 'UPDATE productos SET nombre = ?, precio = ?, tipo = ? WHERE id = ?';
      params = [nombre, precio, tipo, id];
    }

    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
};


module.exports = Producto;
