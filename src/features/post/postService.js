import axios from "axios";

 const API_URL = "http://localhost:8080/posts/"; //mongo 


const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const getById = async (_id) => {
  const res = await axios.get(`${API_URL}id/${_id}`);
  return res.data;
};

const createPost = async (postData, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'multipart/form-data', 
    },
  };

 
  const res = await axios.post(API_URL, postData, config);
  return res.data;
};
const searchByTitle = async (title) => {
  const res = await axios.get(`${API_URL}/search?title=${title}`);
  return res.data;
};

const getPostsByAuthor = async (userId) => {
  const url = `${API_URL}user/${userId}`;
  console.log("Frontend (postService): Intentando obtener posts del autor desde URL:", url);
  try {
    const response = await axios.get(url);
    console.log("Frontend (postService): Respuesta exitosa para getPostsByAuthor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Frontend (postService): Error al obtener posts del autor:", error.response ? error.response.data : error.message);
    throw error; // Re-lanza el error para que pueda ser manejado por el componente que llama
  }
};
const likePost = async (postId, token) => {
   console.log("Frontend (postService - likePost): Token recibido en la función:", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${API_URL}${postId}/like`; 
  console.log("Frontend (postService): Llamando a likePost desde URL:", url);
  try {
    const res = await axios.put(url, {}, config); 
    console.log("Frontend (postService): Respuesta exitosa para likePost:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Frontend (postService): Error al dar/quitar like:", error.response ? error.response.data : error.message);
    throw error;
  }
};


/*const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};*/
const postService = {
  getAll,
  getById,
  createPost,
  searchByTitle,
  getPostsByAuthor,
  //deletePost,
  likePost,
};

export default postService;