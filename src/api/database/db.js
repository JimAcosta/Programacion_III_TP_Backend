import mysql from "mysql2/promise";
import env from "../config/env.js";

const { database } = env;

const conexion = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),

  ssl: {
    rejectUnauthorized: false,
  },

  decimalNumbers: true,
});
console.log({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  db: process.env.MYSQLDATABASE,
});
export default conexion;
