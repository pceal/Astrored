// src/features/post/postSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService"; 

const initialState = {
  posts: [], 
  post: {},  
  userPosts: [], 
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "", 
};

export const getAll = createAsyncThunk("post/getAll", async (_, thunkAPI) => {
  try {
   
    const data = await postService.getAll(); 
  
    return data; 
  } catch (error) {
 
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getById = createAsyncThunk("post/getById", async (_id, thunkAPI) => {
  try {
    return await postService.getById(_id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, thunkAPI) => {
    try {
   
      const token = thunkAPI.getState().auth.token; 

      if (!token) {
        throw new Error("No autorizado, no hay token");
      }

      const data = await postService.createPost(postData, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
   
  }
);

export const searchByTitle = createAsyncThunk(
  "post/searchByTitle",
  async (postName) => {
    try {
      return await postService.searchByTitle(postName);
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPostsByAuthor = createAsyncThunk(
  'posts/getPostsByAuthor', 
  
  async (userId, thunkAPI) => {
    try {
    
      return await postService.getPostsByAuthor(userId);
    } catch (error) {
      
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



/*export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);*/
export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, thunkAPI) => {
    try {
      const authState = thunkAPI.getState().auth;
      const token = authState.token; 
      const user = authState.user; 

     // console.log("Frontend (postSlice - likePost thunk): Estado auth completo:", authState);
      //console.log("Frontend (postSlice - likePost thunk): Objeto user extraído:", user); 
      //console.log("Frontend (postSlice - likePost thunk): Token extraído de Redux para like:", token);
      
      if (!token) {
        console.error("Frontend (postSlice - likePost thunk): Token no encontrado. No se puede dar like.");
        return thunkAPI.rejectWithValue("No autorizado: Debes iniciar sesión para dar 'Me gusta'.");
      }

      return await postService.likePost(postId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts", 
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      //state.message = "";
      //state.posts = []; // Vacía el array de posts al resetear
      // Object.assign(state, initialState); 
      state.searchTerm = ""; 
      state.searchPerformed = false; 
      console.log("postSlice (reset): Estado reseteado. posts.length ahora:", state.posts.length);
    },
    // *** ¡ESTOS REDUCERS SON CRUCIALES Y DEBEN ESTAR AQUÍ! ***
    setSearchTerm: (state, action) => { 
      state.searchTerm = action.payload;
    },
    setSearchPerformed: (state, action) => { 
      state.searchPerformed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
        state.isSuccess = false; 
      
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.posts = Array.isArray(action.payload.posts) ? action.payload.posts : []; 
        
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
     
        state.posts = []; 
     
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        //state.message = "";
        state.post = null; // Limpia el post anterior mientras carga el nuevo
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload; 
     
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      
        state.post = null; 
      })
       .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Creando publicación...";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Publicación creada exitosamente.";
        state.posts.push(action.payload);
        
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Error al crear la publicación.";
        state.isSuccess = false;
      })
       .addCase(searchByTitle.fulfilled, (state, action) => {
      
   state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
 
  state.posts = action.payload; 
})

      .addCase(getPostsByAuthor.pending, (state) => {
        state.isLoading = true;
      })
   
      .addCase(getPostsByAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userPosts = action.payload; 
      })
   
      .addCase(getPostsByAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; 
        state.userPosts = [];
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true; 
        state.isError = false;
        state.message = "";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Me gusta actualizado.";
        
        //console.log("postSlice (likePost.fulfilled): Payload recibido:", action.payload);

        
        const postIndexInPosts = state.posts.findIndex(post => post._id === action.payload._id);
        if (postIndexInPosts !== -1) {
          // Si el post se encuentra, reemplázalo con el objeto actualizado recibido del backend
          state.posts[postIndexInPosts] = action.payload; 
          //console.log("postSlice (likePost.fulfilled): Post actualizado en el array 'posts'.");
        } else {
          //console.warn("postSlice (likePost.fulfilled): Post no encontrado en el array 'posts' para actualizar. ID:", action.payload._id);
        }

       
        const postIndexInUserPosts = state.userPosts.findIndex(post => post._id === action.payload._id);
        if (postIndexInUserPosts !== -1) {
          state.userPosts[postIndexInUserPosts] = action.payload;
          //console.log("postSlice (likePost.fulfilled): Post actualizado en el array 'userPosts'.");
        } else {
         // console.warn("postSlice (likePost.fulfilled): Post no encontrado en el array 'userPosts' para actualizar.");
        }

        // Actualiza el post individual en 'state.post' (si estás en la vista de detalle de un post)
        if (state.post && state.post._id === action.payload._id) {
          state.post = action.payload;
          //console.log("postSlice (likePost.fulfilled): Post individual actualizado en 'state.post'.");
        } else {
           // console.warn("postSlice (likePost.fulfilled): Post individual NO actualizado en 'state.post' (ID no coincide o state.post es nulo). ID:", action.payload._id);
        }

        // Logs de depuración para verificar el estado después de la actualización
        //console.log("postSlice (likePost.fulfilled): Estado 'posts' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.posts)));
        //console.log("postSlice (likePost.fulfilled): Estado 'post' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.post)));
        //console.log("postSlice (likePost.fulfilled): Estado 'userPosts' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.userPosts)));
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        //console.error("Error al dar/quitar like:", action.payload);
      });
  },
});
     
  

       
        
     




export const { reset, setSearchTerm, setSearchPerformed  } = postSlice.actions; 
export default postSlice.reducer;