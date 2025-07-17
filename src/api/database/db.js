import mysql from "mysql2/promise";
import env from "../config/env.js";

const { database } = env;

const conexion = mysql.createPool({
  host: database.host,
  user: database.user,
  password: database.password,
  port: database.port,
  database: database.name,
  decimalNumbers: true,
});

export default conexion;