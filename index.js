import express from "express";
import env from "./src/api/config/env.js";
import cors from "cors";
import { registro } from './src/api/middlewares/middlewares.js'
import { productsRoutes, dashboardRoutes, salesRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js"

const app = express();
const port = env.port;

// Configuracion de EJS como motor de plantillas
app.set("view engine", "ejs");
// Servimos vistas desde raiz del proyecto
app.set("views", join(__dirname, "src/views"));
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

app.use(cors());
app.use(express.json());
app.use(registro);

app.use("/api/products", productsRoutes);
app.use("/api/sales", salesRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

