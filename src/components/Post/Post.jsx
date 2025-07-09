import React from 'react';
import { Card, Avatar, Button} from 'antd'; 
import { Link } from 'react-router-dom';
import { likePost } from "../../features/post/postSlice";
const { Meta } = Card;
import { useSelector, useDispatch } from 'react-redux';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

const Post = ({ post }) => { 

  console.log("Post.jsx está recibiendo el siguiente objeto 'post':", post);
  
  if (!post || typeof post !== 'object' || Object.keys(post).length === 0) {
    console.warn("Post.jsx: No se recibió un objeto 'post' válido. No se renderizará.");
    return null;
  }


  const backendBaseUrl = "http://localhost:8080";


  const imageUrl = post.images && Array.isArray(post.images) && post.images.length > 0
    ? `${backendBaseUrl}${post.images[0]}`
    : "https://placehold.co/600x400/cccccc/333333?text=No+Image";
 console.log(`Intentando cargar imagen para post ID: ${post._id || 'N/A'}, Título: ${post.title || 'N/A'}. URL: ${imageUrl}`);

  const authorName = post.author?.username || "Usuario Desconocido";
  const authorImage = post.author?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`;
  
const postDate = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Fecha Desconocida";
const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth);
console.log("Post.jsx: Estado actual del usuario (desde Redux):", user); 
  const hasLiked = user && post.likes && Array.isArray(post.likes) && post.likes.includes(user._id);
   
  const handleLike = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
     if (!user) {
      alert("Debes iniciar sesión para dar 'Me gusta'."); 
      return;
    }
    dispatch(likePost(post._id)); 
  };
  
    return (
    <Card
      style={{
        width: 700, 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        overflow: 'hidden', 
        marginBottom: '20px' 
      }}
      cover={ 
        <img
          alt={post.title || "Imagen de publicación"}
          src={imageUrl}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/600x400/cccccc/333333?text=No+Image"; 
          }}
          style={{ height: 250, objectFit: 'cover' }} 
          
        />
      }
       
    >
    
      <Meta
        avatar={<Avatar src={authorImage} />} 
        title={authorName} 
        description={<span style={{ fontSize: '0.8em', color: '#888' }}>{postDate}</span>} 
      />

     
      <div style={{ padding: '16px 0' }}>
     
        <Link to={`/posts/id/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '10px', color: '#333' }}>
            {post.title || "Título no disponible"}
          </h4>
        </Link>
        <p style={{ fontSize: '0.9em', lineHeight: '1.5', color: '#555' }}>
          {post.content || "Contenido no disponible."}
        </p>
         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Button
            type="text"
            icon={hasLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
            onClick={handleLike}
            style={{ padding: '0 8px' }} 
          >
            <span style={{ marginLeft: '4px', fontWeight: 'bold', color: '#555' }}>
              {post.likes ? post.likes.length : 0}
            </span>
          </Button>
          <span style={{ fontSize: '0.9em', color: '#888', marginLeft: '5px' }}>Me gusta</span>
        </div>
        {<Link to={`/posts/id/${post._id}`} style={{ textDecoration: 'none', color: '#1890ff' }}>añade tu comentario</Link>}
      </div>
    </Card>
  );
};

export default Post;



