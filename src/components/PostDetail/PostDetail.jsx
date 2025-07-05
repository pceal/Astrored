import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../features/post/postSlice"; 
import { Card } from "antd";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();


  const { post, isLoading, isError, message } = useSelector((state) => state.posts);

  //console.log("ID de la URL:", _id); // Para depuración
  //console.log("Estado actual de post (desde Redux):", post); // Para depuración

  useEffect(() => {
   
    if (_id) {
      dispatch(getById(_id));
    }

   
    return () => {
      dispatch(reset());
    };
  }, [_id, dispatch]); 

  if (isLoading) {
    return <div className="text-center p-4">Cargando publicación...</div>;
  }

 
  if (isError) {
    return <div className="text-center p-4 text-red-600">Error: {message || "No se pudo cargar la publicación."}</div>;
  }


  if (!post || Object.keys(post).length === 0) {
    return <div className="text-center p-4">No se encontró la publicación o está vacía.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card 
        title={post.title || "Título no disponible"} 
        style={{ width: '100%', maxWidth: 500, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        className="bg-white"
      >
        <p className="text-gray-700 text-base leading-relaxed">{post.content || "Contenido no disponible."}</p>
        {post.author && <p className="text-gray-500 text-sm mt-4">Autor: {post.author.username}</p>}
      </Card>
    </div>
  );
};

export default PostDetail;
