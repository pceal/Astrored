import axios from "axios";

 const API_URL = "http://localhost:8080/posts"; //mongo 


const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const getById = async (_id) => {
  const res = await axios.get(`${API_URL}/id/${_id}`);
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
/*const getPostByName = async (postName) => {
  const res = await axios.get(`${API_URL}/title/${postName}`);
  return res.data;
};*/

const postService = {
  getAll,
  getById,
  createPost,
  //getPostByName,
};

export default postService;