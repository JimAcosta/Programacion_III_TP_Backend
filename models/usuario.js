const db = require('./db');

const Usuario = {
  verificarCredenciales: async (usuario, password) => {
    

    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND clave = ? LIMIT 1';

    try {
      const [results] = await db.query(sql, [usuario, password]);

      if (results.length > 0) {
        return { success: true, data: results[0] };
      } else {
        return { success: true, data: null };
      }
    } catch (error) {
      return { success: false, error };
    }
  }
};

module.exports = Usuario;


