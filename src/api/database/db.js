import pg from "pg";

const { Pool } = pg;

const conexion = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),

  ssl: {
    rejectUnauthorized: false,
  },
});

console.log({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export default conexion;
