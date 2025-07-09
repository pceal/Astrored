import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../features/post/postSlice"; 
import { Card, Input, Button,} from "antd"; 


const { TextArea } = Input; 
const PostDetail = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { post, isLoading, isError, message } = useSelector((state) => state.posts);
  const [commentText, setCommentText] = useState(''); 

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

  
  const backendBaseUrl = "http://localhost:8080";
  const imageUrl = post.images && Array.isArray(post.images) && post.images.length > 0
    ? `${backendBaseUrl}${post.images[0]}`
    : "https://placehold.co/600x400/cccccc/333333?text=No+Image"; 

 
  const authorName = post.author?.username || "Usuario Desconocido";
  const authorImage = post.author?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`;
  const postDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Fecha Desconocida";

 
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log("Comentario enviado:", commentText);
     
      setCommentText(''); 
    } else {
      console.log("El comentario está vacío.");
    }
  };

  return (
    <div className="post-detail-container1" >
      <div style={{ width: '100%', maxWidth: 500, }}>
        <Card 
          title={
            <h2 style={{ 
              fontWeight: 'bold', 
              fontSize: '1.5em', 
              margin: 0,
              whiteSpace: 'normal', 
              overflowWrap: 'break-word' 
            }}>
              {post.title || "Título no disponible"}
            </h2>
          } 
          style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          className="bg-white"
        >
      
        </Card>

      
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h4 style={{ marginBottom: '15px', fontSize: '1.2em', color: '#333' }}>Escribe tu comentario</h4>
          <TextArea
            rows={4}
            placeholder="Escribe tu comentario aquí..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ marginBottom: '15px', borderRadius: '5px' }}
          />
          <Button 
            type="primary" 
            onClick={handleSubmitComment} 
            disabled={!commentText.trim()}
            style={{ width: '100%', borderRadius: '5px' }}
          >
            Publicar Comentario
          </Button>
        </div>
      </div>
    </div>
  );
  };

export default PostDetail;

