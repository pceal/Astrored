import React from 'react';
// ¡CORRECCIÓN CLAVE AQUÍ! La ruta debe apuntar a la carpeta 'Posts' (en plural)
// y al archivo 'Posts.jsx' (también en plural).
import Posts from "../Posts/Posts"; // Asumiendo que Posts.jsx está en src/components/Posts/
import CreatePostForm from "../CreatePostForm/CreatePostForm"; // Asumiendo que CreatePostForm.jsx está en src/components/CreatePostForm/CreatePostForm.jsx

const Home = () => {
  return (
     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      {/* Títulos y descripción */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">¡Bienvenido a AstroRed!</h2>
        <p className="text-lg text-gray-600">Explora las últimas publicaciones de la comunidad y comparte las tuyas.</p>
      </div>

      {/* Contenedor para el formulario de creación de posts */}
      <div className="w-full max-w-2xl mb-10 p-6 bg-white rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crea una Nueva Publicación</h3>
        <CreatePostForm />
      </div>

      {/* Contenedor para la lista de publicaciones */}
      <div className="w-full">
        <Posts />
      </div>
    </div>
  );
};



export default Home;

