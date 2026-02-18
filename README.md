# Vibras Store – Admin API

Descripción

API REST desarrollada con Node.js y Express que permite administrar productos (Discos y Vinilos) y gestionar ventas dentro de una tienda online.

## El sistema funciona como un dashboard administrativo que permite:

- Crear productos (Discos o Vinilos)
- Activar o desactivar productos (baja lógica)
- Buscar productos por ID
- Visualizar ventas realizadas
- Generar y descargar reportes en PDF de las ventas


El objetivo del proyecto es simular un sistema real de gestión comercial con separación clara entre backend administrativo y frontend cliente.

## Tecnologías Utilizadas

- Node.js
- Express.js
- JavaScript
- jsPDF
- CORS
- Dotenv


## Arquitectura

El proyecto está organizado siguiendo una estructura modular separando responsabilidades

- Routes → Define endpoints
- Controllers → Lógica de cada endpoint
- Services → Reglas de negocio
- Models → Estructura de datos
- Utils → Generación de PDF y helpers


##Funcionalidades Principales

Gestión de Productos

GET /dashboard → Lista los productos
POST /dashboard/new-product → Crea un producto
PUT /dashboard/edit-product/2 → Edita un Producto
PUT /api/products/${selectedProductId} → Activar / Desactivar producto
GET /dashboard/get-product → Busca producto por ID
GET /dashboard/sales → Lista las ventas

### Los productos pueden ser:

- Disco
- Vinilo

### Cada producto posee:

- id
- nombre
- tipo
- precio
- estado (activo/inactivo)
- imagen 


El reporte PDF incluye:

- ID de la venta
- Fecha
- Productos comprados
- Cantidad
- Precio unitario
- Total

Lógica de Negocio Destacada

- Baja lógica de productos (no se eliminan físicamente).
- Generación dinámica de PDF.
- Separación clara entre lógica administrativa y consumo cliente.

### Demo en Producción

https://programacion-iii-tp-backend.onrender.com/dashboard