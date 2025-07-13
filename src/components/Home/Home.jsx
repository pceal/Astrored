

import Posts from "../Posts/Posts"; 
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Link } from 'react-router-dom'; // Importa Link

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
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
             <Link to="/search" style={{ 
                display: 'inline-block', 
                padding: '10px 20px', 
                backgroundColor: '#1890ff', 
                color: 'white', 
                borderRadius: '5px', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
              Ir a la Página de Búsqueda
            </Link>
          </div>

           <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
