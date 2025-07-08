import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, reset } from '../../features/post/postSlice'; 
import { Spin, notification } from 'antd'; 
import Post from '../Post/Post'; 


const Posts = () => {
  const dispatch = useDispatch();
 
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log("DEBUG Posts.jsx (useEffect): Despachando la acción getAll() para cargar publicaciones.");
    //dispatch(reset());
    
    dispatch(getAll());

    return () => {
    
    };
  }, []);

  console.log("Posts.jsx (render): Estado actual de 'posts' (del slice):", posts);
  console.log("Posts.jsx (render): Estado actual de 'isLoading':", isLoading);
  console.log("Posts.jsx (render): Estado actual de 'isError':", isError);
 console.log("Posts.jsx (render): Mensaje actual:", message);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '15px', fontSize: '1.1rem', color: '#555' }}>Cargando publicaciones...</p>
      </div>
    );
  }

  if (isError) {
    notification.error({
      message: 'Error al cargar publicaciones',
      description: message,
      duration: 5, 
    });
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red', fontSize: '1.1rem' }}>
        <p>Error al cargar las publicaciones: {message}</p>
        <p>Por favor, verifica tu conexión o intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#888' }}>
        <p>No hay publicaciones disponibles en este momento.</p>
        <p>¡Sé el primero en crear una!</p>
      </div>
    );
  }

  return (

    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',   
        gap: '20px',           
        padding: '20px',        
        width: '100%',          
        maxWidth: '1200px',     
        margin: '0 auto'        
      }}
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};


export default Posts;


