const API_URL = 'http://localhost:8080/api/posts/';

import React, { useEffect } from 'react';
import { Card, Avatar, Spin, Alert, message as AntMessage } from 'antd'; 
import { UserOutlined } from '@ant-design/icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByAuthor, reset } from '../../features/post/postSlice'; 


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
  const { userPosts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

useEffect(() => {
    
    if (user && user._id) { 
      dispatch(getPostsByAuthor(user._id));
    } else {
      
    }

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]); 

 useEffect(() => {
    if (isError) {
      AntMessage.error(message); 
    }
   
 
 
  }, [isError, isSuccess, message, dispatch]);
 


  if (!user) { 
    return <div className="text-center p-4 text-gray-700">Por favor, inicia sesión para ver tu perfil y tus publicaciones.</div>;
  }

  return (
    <div className="profile-page-container p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mi Perfil
      </h1>

   
      <Card
        className="mb-8 p-4 text-center"
        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Avatar size={64} icon={<UserOutlined />} className="mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.username}</h2>
        <p className="text-gray-600 text-lg">{user?.email}</p>
      </Card>
    
      
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Mis Publicaciones
      </h2>

      {isLoading ? (
        <div className="text-center p-4">
          <Spin size="large" />
          <p className="text-gray-600 mt-2">Cargando publicaciones...</p>
        </div>
      ) : isError ? (
        <Alert message="Error" description={message} type="error" showIcon />
      ) : userPosts.length > 0 ? (
        <div className="posts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPosts.map((post) => (
            <div key={post._id} className="relative">
           
              <Card
                hoverable
                className="post-card w-full h-full flex flex-col"
                style={{ borderRadius: '8px', overflow: 'hidden' }}
                cover={
                  post.image ? (
                    <img
                      alt={post.title}
                      src={post.image}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                      
                    </div>
                  )
                }
              >
                <Card.Meta
                  title={<h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>}
                  description={<p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>}
                />
             
              </Card>
           
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 p-4">No tienes publicaciones aún.</p>
      )}
     
    </div>
  );
};

     


export default Profile;












/*const getPostsByAuthor = async (userId) => {
  // Realiza una solicitud GET a la API para obtener las publicaciones del autor
  const response = await axios.get(`${API_URL}author/${userId}`);
  return response.data; // Devuelve los datos de las publicaciones
};

// Exporta las funciones del servicio
const profile = {
  getPostsByAuthor,
};

export default profile;/*

/*import { useState } from 'react';
import Search from '../Search/Search';
//import { useNavigate } from 'react-router-dom'; // Para redirigir después de buscar

const Profile = () => {

   const [text, setText] = useState("");
   //const navigate = useNavigate(); // Hook para redirigir después de buscar

    const handleSearch = (e) => {
    setText(e.target.value);
    if (e.key == "Enter") {
      // console.log(text);
      navigate("/search/" + text);
    }
  };
  return (
    <>
      <Search/>
      <div>
        <input onKeyUp={handleSearch} placeholder="search posts or users " type="text" name="text" />
      </div>
    </>
  )
}

export default Profile*/