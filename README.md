# 🌌 AstroRed - Red Social Astrológica

**¡Bienvenido a AstroRed!** 
AstroRed es una aplicación web que permite a los usuarios crear, visualizar, actualizar y eliminar publicaciones, así como interactuar con otros usuarios mediante likes, comentarios y búsqueda de contenido.

---

## ✨ Características Principales

### 🔐 Autenticación de Usuarios
- Registro de nuevos usuarios.
- Inicio de sesión seguro con JWT (JSON Web Tokens).
- Cierre de sesión (logout).
- Protección de rutas con Guards.
- Validaciones de formularios (frontend).

### 📝 Gestión de Publicaciones (CRUD)
- Crear publicación con título, contenido e imágenes.
- Ver publicaciones en el feed principal.
- Ver detalles de una publicación y comentar.

### ❤️ Interacción con Publicaciones
- Like / Dislike en publicaciones.

### 👤 Perfiles de Usuario
- Ver perfil del usuario logueado y sus publicaciones.

### 🖼️ Manejo de Imágenes
- Subida de imágenes en publicaciones.
- Visualización en tarjetas.
- Imagen por defecto si no se sube ninguna.

### 🔍 Buscador General
- Buscar publicaciones por título con resultados dinámicos.

---

## 🎯 Requisitos del Proyecto

### Requisitos Técnicos
- Uso de **Redux Toolkit**.
- Estilos con **SASS** (`colors.scss`).
- Diseño atractivo y **responsive**.
- Guards de rutas privadas.
- Validaciones en el frontend.
- Control de versiones con Git (`main`, `develop`).

---

## 🛠️ API REST - Endpoints


POST    /api/users/register        # Registrar usuario
POST    /api/users/login           # Login
GET     /api/posts                 # Obtener publicaciones
POST    /api/posts                 # Crear publicación
GET     /api/posts/:id             # Ver publicación por ID
PUT     /api/posts/like/:id        # Like/dislike a publicación
GET     /api/profile/:id           # Datos del perfil + posts
GET     /api/search/posts?title=   # Buscar por título

## 🧩 Componentes Frontend

```text
/src/components/
├── Register.jsx
├── Login.jsx
├── Home.jsx
├── Search.jsx
├── Posts.jsx
├── AddPost.jsx
├── PostDetail.jsx
├── AddComment.jsx
├── Profile.jsx
├── Header.jsx
└── Footer.jsx


## 🌐 Rutas (React Router)

```text
/home          → Feed principal 
/login         → Inicio de sesión 
/register      → Registro 
/profile       → Perfil del usuario 
/post/:id      → Detalles del post 
/search        → Buscar publicaciones 
---

## 🧱 Tecnologías

### 🛠️ Backend

- **Node.js** – Entorno de ejecución para JavaScript en el servidor. 
- **Express.js** – Framework minimalista para construir la API. 
- **MongoDB + Mongoose** – Base de datos NoSQL y ODM para modelar los datos. 
- **JWT (JSON Web Token)** – Autenticación segura mediante tokens. 
- **Bcrypt.js** – Hashing de contraseñas. 
- **Multer** – Middleware para subida de imágenes. 
- **Express-Async-Handler** – Manejo de errores en funciones async. 
- **CORS** – Permitir solicitudes desde el frontend.

### 💻 Frontend

- **React** – Librería para construir interfaces de usuario. 
- **Redux Toolkit** – Manejo del estado global de forma eficiente. 
- **React Router DOM** – Navegación entre rutas en SPA. 
- **SASS** – Preprocesador CSS para estilos más organizados. 
- **Ant Design (AntD)** – Librería de componentes UI. 
- **Axios** – Cliente HTTP para comunicar con la API.

---
---

## ⚙️ Instalación y Ejecución

### 🔧 Requisitos previos

- Tener instalado **Node.js** y **npm**.
- Tener instalado **MongoDB** y que esté corriendo localmente o tener acceso a una base de datos remota.

---

### 🛠️ Backend

1. Clona el repositorio:

 
   git clone https://github.com/tu-usuario/nombre-repo.git
Navega a la carpeta del backend e instala las dependencias:

Bash

cd backend
npm install
Crea un archivo .env en la raíz de la carpeta backend y añade las siguientes variables de entorno:

PORT=8080
MONGO_URI=mongodb://localhost:27017/astrored # O tu URI de MongoDB Atlas
JWT_SECRET=tu_secreto_jwt_muy_seguro # ¡Cambia esto por una cadena aleatoria y compleja!
Importante: Asegúrate de que tu index.js o server.js en el backend incluya la configuración de CORS:

JavaScript

const cors = require("cors");
app.use(cors());
Inicia el servidor backend:

Bash

npm start
El backend se ejecutará en http://localhost:8080 (o el puerto que hayas configurado).

💻 Frontend
Abre una nueva terminal, navega a la carpeta del frontend e instala las dependencias:

Bash

cd frontend
npm install
Guía de Configuración del Entorno de Desarrollo y Dependencias:
Estos son los comandos para inicializar tu proyecto y añadir las librerías necesarias:

Bash

# Para crear un nuevo proyecto Vite (si aún no lo tienes)
npm create vite@latest

# Para instalar CORS en el backend (si no lo has hecho)
npm i cors

# Para instalar SASS como dependencia de desarrollo
npm install sass --save-dev

# Para instalar React Router DOM v6
npm install react-router-dom@6

# Para instalar React Router (si lo necesitas por separado, aunque react-router-dom@6 ya lo incluye)
npm install react-router

# Para instalar React Icons
npm install react-icons --save

# Para instalar Ant Design
npm install antd

# Para instalar Axios (cliente HTTP)
npm install axios

# Para instalar Redux Toolkit y React Redux
npm i @reduxjs/toolkit react-redux

# Parche para compatibilidad de Ant Design con React 19 (si usas React 19)
npm install @ant-design/v5-patch-for-react-19
Crea un archivo .env en la raíz de la carpeta frontend y añade la siguiente variable de entorno:

REACT_APP_BACKEND_URL=http://localhost:8080
Inicia la aplicación frontend:

Bash

npm start
La aplicación frontend se abrirá en tu navegador en el puerto por defecto de React.

💡 Uso de la Aplicación
Registro/Inicio de Sesión: Accede a la aplicación y regístrate o inicia sesión con tus credenciales.

Ver Publicaciones: Explora la página principal (/home) para ver todas las publicaciones.

Crear Publicación: Una vez autenticado, podrás crear nuevas publicaciones desde la sección correspondiente (/addpost o un botón en Home).

Interactuar: Da "Me gusta" en las publicaciones.

Buscar: Utiliza la barra de búsqueda para encontrar publicaciones por su título.

Gestionar Perfil: Visita /profile para ver tus datos y tus publicaciones.

Gestionar Publicaciones: Si eres el autor de una publicación, podrás editarla o eliminarla.

📏 Reglas de Código
Para mantener la calidad y la legibilidad del código, se han establecido las siguientes reglas:

Componentes: Los componentes de React no deben exceder las 400 líneas de código.

Funciones: Las funciones individuales no deben exceder las 75 líneas de código.

✨ Próximas Mejoras / Funcionalidades a Implementar
Estas son las funcionalidades y mejoras planificadas para futuras iteraciones del proyecto, que enriquecerán aún más la experiencia de usuario y la robustez de la aplicación:

CRUD Completo de Comentarios:

Posibilidad de crear, leer, actualizar y eliminar comentarios.

Solo el autor de un comentario podrá editarlo o eliminarlo.

Likes en Comentarios:

Los usuarios podrán dar "Me gusta" a los comentarios de los posts.

Buscador de Perfiles de Usuario:

Extender la funcionalidad de búsqueda para incluir perfiles de usuario.

Funcionalidades de Seguidores/Seguidos:

El usuario podrá seguir a otros usuarios y tener seguidores.

En el perfil del usuario, se podrá ver el número de seguidores y a cuántos usuarios sigue.

El usuario podrá ver quién le sigue y a quién sigue.

Posts con Like en Perfil:

En el perfil del usuario, se podrá ver una sección con los posts a los que le ha dado "Me gusta".

Gestión de Fotos de Perfil:

Los usuarios podrán subir y cambiar su foto de perfil.

Documentación Interactiva del Backend (Swagger):

Implementación de Swagger UI para una documentación interactiva y fácil de usar de la API RESTful.

Mejoras de Rendimiento en Backend:

Optimización de consultas a la base de datos.

Posible implementación de caché.

Mejoras UI/UX Adicionales:

Animaciones y transiciones más fluidas.

Carga diferida (lazy loading) de imágenes y componentes.

Mejoras en la accesibilidad.

📂 Estructura del Proyecto
Fragmento de código

graph TD
    A[Astrored] --> B[node_modules]
    A --> C[public]
    A --> D[src]

    D --> D1[app]
    D1 --> D1a[store.js]

    D --> D2[assets]
    D2 --> D2a[Icons]
    D2 --> D2b[react.svg]

    D --> D3[components]
    D3 --> D3a[Admin]
    D3 --> D3b[CreatePostForm]
    D3b --> D3b1[CreatePostForm.jsx]
    D3 --> D3c[Footer]
    D3c --> D3c1[FooterDeskop]
    D3c1 --> D3c1a[FooterDeskop.jsx]
    D3c1 --> D3c1b[FooterDeskop.scss]
    D3c --> D3c2[FooterMobile]
    D3 --> D3d[Guards]
    D3d --> D3d1[AdminZone.jsx]
    D3d --> D3d2[PrivateZone.jsx]
    D3 --> D3e[Home]
    D3e --> D3e1[Home.jsx]
    D3 --> D3f[Login]
    D3f --> D3f1[Login.jsx]
    D3f --> D3f2[Login.scss]
    D3 --> D3g[Navbar]
    D3g --> D3g1[NavbarDeskop]
    D3g1 --> D3g1a[NavbarDeskop.jsx]
    D3g1 --> D3g1b[NavbarDeskop.scss]
    D3g --> D3g2[NavbarMobile]
    D3 --> D3h[Post]
    D3h --> D3h1[Post.jsx]
    D3 --> D3i[PostDetail]
    D3i --> D3i1[PostDetail.jsx]
    D3 --> D3j[Posts]
    D3j --> D3j1[Posts.jsx]
    D3 --> D3k[Profile]
    D3k --> D3k1[Profile.jsx]
    D3 --> D3l[Register]
    D3l --> D3l1[Register.jsx]
    D3l --> D3l2[Register.scss]
    D3 --> D3m[Search]
    D3m --> D3m1[Search.jsx]

    D --> D4[features]
    D4 --> D4a[auth]
    D4a --> D4a1[authService.js]
    D4a --> D4a2[authSlice.js]
    D4 --> D4b[post]
    D4b --> D4b1[postService.js]
    D4b --> D4b2[postSlice.js]

    D --> D5[styles]
    D5 --> D5a[_colors.scss]
    D5 --> D5b[App.css]
    D5 --> D5c[index.css]

    D --> D6[App.jsx]
    D --> D7[index.html]
    D --> D8[main.jsx]
    D --> D9[.gitignore]
    D --> D10[eslint.config.js]
    D --> D11[package-lock.json]
    D --> D12[package.json]



