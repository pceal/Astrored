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
  const res = await axios.get(`${API_URL}search?title=${title}`);
  return res.data;
};

const getPostsByAuthor = async (userId) => {
  const url = `${API_URL}user/${userId}`;
  
  try {
    const response = await axios.get(url);
    
    return response.data;
  } catch (error) {
    
    throw error; 
  }
};
const likePost = async (postId, token) => {
   
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${API_URL}${postId}/like`; 
 
  try {
    const res = await axios.put(url, {}, config); 
    
    return res.data; 
  } catch (error) {
    
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