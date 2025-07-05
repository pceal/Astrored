import React from 'react';
// ¡CORRECCIÓN CLAVE AQUÍ! La ruta debe apuntar a la carpeta 'Posts' (en plural)
// y al archivo 'Posts.jsx' (también en plural).
import Posts from "../Posts/Posts"; // Asumiendo que Posts.jsx está en src/components/Posts/

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', marginTop: '20px' }}>
      <h2>¡Bienvenido a AstroRed!</h2>
      <p>Explora las últimas publicaciones de la comunidad.</p>
      <Posts /> {/* Aquí se renderizarán todas las publicaciones */}
    </div>
  );
};

export default Home;

