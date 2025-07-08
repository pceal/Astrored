import React from 'react';

import Posts from "../Posts/Posts"; 
import CreatePostForm from "../CreatePostForm/CreatePostForm";

const Home = () => {
  return (


    <div className="home-page-container">

      <div className="home-create-posts">

        <div className="home-create">
          <CreatePostForm />
        </div>
        <div className="posts-wellcome">
          
            <h2 className="welcome-title">¡Bienvenido a AstroRed!</h2>
            <p className="welcome-description">Explora las últimas publicaciones de la comunidad y comparte las tuyas.</p>
<div className="home-posts">
            <Posts />
          </div>
        </div>
      </div>
    </div>
    

  );
};


export default Home;
