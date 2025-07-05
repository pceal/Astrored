import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, reset } from '../../features/post/postSlice'; 
import { Spin, notification } from 'antd'; 
import Post from '../Post/Post'; 

const Posts = () => {
  const dispatch = useDispatch();
 
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(reset());
    console.log("DEBUG Posts.jsx (useEffect): Despachando la acción getAll() para cargar publicaciones.");
    dispatch(getAll());

    return () => {
    
    };
  }, []);

  //console.log("Posts.jsx (render): Estado actual de 'posts' (del slice):", posts);
  //console.log("Posts.jsx (render): Estado actual de 'isLoading':", isLoading);
  //console.log("Posts.jsx (render): Estado actual de 'isError':", isError);
 // console.log("Posts.jsx (render): Mensaje actual:", message);

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
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', color: '#333' }}>Todas las Publicaciones</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        <Post /> 
      </div>
    </div>
  );
};

export default Posts;


