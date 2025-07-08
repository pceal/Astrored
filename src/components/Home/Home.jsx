

import Posts from "../Posts/Posts"; 
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { useState } from 'react';
import Search from '../Search/Search';
//import { useNavigate } from 'react-router-dom'; // Para redirigir después de buscar
import { useSelector } from 'react-redux';


const Home = () => {
  // Obtenemos el estado 'searchPerformed' de Redux.
  // Este booleano nos indica si el usuario ha realizado una búsqueda o no.
  const { searchPerformed } = useSelector((state) => state.posts);

  return (
    <div className="home-page-container">
      <div className="home-create-posts">
        <div className="home-create">
          <CreatePostForm /> {/* Este componente siempre se muestra */}
        </div>
        <div className="posts-wellcome">
          <h2 className="welcome-title">¡Bienvenido a AstroRed!</h2>
          <p className="welcome-description">Explora las últimas publicaciones de la comunidad y comparte las tuyas.</p>
          <Search/>
          {!searchPerformed && (
            <div className="home-posts">
              <Posts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
