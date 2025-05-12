🎬 Shark Cinema - Aplicación Web para Cine
Aplicación web moderna para una cadena de cines llamada Shark Cinema. Los usuarios pueden consultar cartelera, próximos estrenos, ver trailers desde YouTube, registrarse, iniciar sesión y (en el futuro) reservar entradas.

—

🛠️ Tecnologías Utilizadas

Frontend:

React JS (con Vite)

React Router DOM

Axios (para consumir APIs)

CSS personalizado

Backend:

PHP 8.x

MySQL

Hostinger (hosting + base de datos)

—

📁 Estructura del Proyecto

Frontend - React (src/)

src/
├── assets/ → Imágenes, logos
├── components/ → Componentes reutilizables (Navbar, Footer, TrailerCard)
├── layout/ → MainLayout.jsx (estructura general)
├── pages/ → Páginas de navegación
│ ├── Home/
│ ├── Peliculas/
│ ├── ProximosEstrenos/
│ ├── Trailer/
│ ├── Login/
│ └── Register/
├── router/ → Rutas de la app (AppRoutes.jsx)
├── styles/ → Estilos globales (main.css)
├── App.jsx → Componente raíz
└── main.jsx → Punto de entrada de Vite

Backend - PHP (public_html o shark-cinema-api/)

shark-cinema-api/
├── db.php → Conexión a base de datos
├── peliculas/
│ ├── getAll.php
│ └── getById.php
├── estrenos/
│ └── get.php
├── trailers/
│ └── get.php
├── auth/
│ ├── login.php
│ └── register.php
└── reservas/
├── create.php
└── getByUser.php

—

📦 Base de Datos MySQL

Base de datos: sharkcinema

Tablas principales:

usuarios (id, nombre, email, password)
peliculas (id, titulo, descripcion, imagen_url, trailer_url)
estrenos (id, titulo, fecha_estreno, imagen_url, trailer_url)
reservas (id, usuario_id, pelicula_id, fecha_reserva)

—

🔐 Seguridad Backend

Uso de password_hash() y password_verify()

Validación de datos con filter_var y escapes

Consultas seguras con PDO (prepared statements)

Sanitización de salida para evitar XSS

Archivos PHP protegidos desde .htaccess (opcional)

—

🌐 Consumo desde React (ejemplo)

useEffect(() => {
axios.get("https://tudominio.com/peliculas/getAll.php")
.then((res) => setPeliculas(res.data));
}, []);

—

🚀 Despliegue en Hostinger

Sube shark-cinema-api/ a public_html

Configura la base de datos desde tu panel

Modifica db.php con credenciales reales

Accede a la API desde tu frontend (Axios/Fetch)

—

📽️ Funcionalidades Actuales

✅ Ver películas
✅ Consultar próximos estrenos
✅ Reproducción de trailers desde YouTube
✅ Registro e inicio de sesión

🧩 Pendiente/Futuro

🟡 Sistema de reservas
🟡 Panel de administración
🟡 Calificaciones de películas
🟡 Sistema de asientos y horarios

—

📌 Autor

Desarrollado para el proyecto web Shark Cinema — 2025
