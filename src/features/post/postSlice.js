// src/features/post/postSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService"; 

const initialState = {
  posts: [], // El array de publicaciones
  post: {},  // Para un post individual
  userPosts: [], 
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "", 
};

export const getAll = createAsyncThunk("post/getAll", async (_, thunkAPI) => {
  try {
   
    const data = await postService.getAll(); 
   // console.log("DEBUG postSlice (getAll thunk): Datos recibidos de postService:", data);
    return data; // Retorna los datos directamente
  } catch (error) {
   // console.error("DEBUG postSlice (getAll thunk): Error capturado en la petición:", error);
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
  'posts/getPostsByAuthor', // Nombre de la acción
  
  async (userId, thunkAPI) => {
    try {
      // Llama a la función del servicio para obtener las publicaciones del autor
      return await postService.getPostsByAuthor(userId);
    } catch (error) {
      // Si hay un error, extrae el mensaje de error y lo rechaza
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


// Eliminar una publicación
export const deletePost = createAsyncThunk(
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
);
export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, thunkAPI) => {
    try {
      const authState = thunkAPI.getState().auth;
      const token = authState.token; // Obtener el token directamente de authState
      const user = authState.user; 

      console.log("Frontend (postSlice - likePost thunk): Estado auth completo:", authState);
      console.log("Frontend (postSlice - likePost thunk): Objeto user extraído:", user); 
      console.log("Frontend (postSlice - likePost thunk): Token extraído de Redux para like:", token);
      
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
        state.isSuccess = false; 
        //state.message = ""; 
       // console.log("DEBUG postSlice (getAll.pending): Petición de posts pendiente.");
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.posts = Array.isArray(action.payload.posts) ? action.payload.posts : []; 
        //state.message = "Publicaciones cargadas exitosamente";
        //console.log("DEBUG postSlice (getAll.fulfilled): Publicaciones cargadas. Payload:", action.payload);
        //console.log("DEBUG postSlice (getAll.fulfilled): Estado final de posts (después de corrección):", state.posts);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
       // state.message = action.payload; 
        state.posts = []; // Limpia las publicaciones en caso de error
       // console.error("DEBUG postSlice (getAll.rejected): Error al cargar publicaciones. Mensaje:", action.payload);
       // console.error("DEBUG postSlice (getAll.rejected): Estado final de posts:", state.posts);
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
        //state.message = "Publicación individual cargada exitosamente";
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //state.message = action.payload;
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
        // SOLUCIÓN --> Si la búsqueda devuelve un solo post, lo guardamos como array
        //state.posts = Array.isArray(action.payload) //SI es un array
         // ? action.payload //guarda el array
         // : [action.payload]; // si no lo es --> Envuelve el objeto en un array
         state.isLoading = false;
  state.isSuccess = true;
  state.isError = false;
  //state.message = "Búsqueda completada!";
  state.posts = action.payload; // <-- Asegúrate de que action.payload sea directamente el array de posts
})
// Maneja el estado pendiente de la acción getPostsByUser
      .addCase(getPostsByAuthor.pending, (state) => {
        state.isLoading = true;
      })
      // Maneja el estado de éxito de la acción getPostsByUser
      .addCase(getPostsByAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userPosts = action.payload; // Asigna las publicaciones obtenidas al estado userPosts
      })
      // Maneja el estado de fallo de la acción getPostsByUser
      .addCase(getPostsByAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Asigna el mensaje de error
        state.userPosts = []; // Vacía las publicaciones en caso de error
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true; // Puedes ponerlo a true para indicar que una acción de like está en progreso
        state.isError = false;
        state.message = "";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       // state.message = "Me gusta actualizado.";
        
        // 1. Actualiza el post en el array 'posts' (para la lista principal de publicaciones)
        const postIndexInPosts = state.posts.findIndex(post => post._id === action.payload._id);
        if (postIndexInPosts !== -1) {
          state.posts[postIndexInPosts] = action.payload; // Reemplaza el post antiguo con el actualizado
          console.log("postSlice (likePost.fulfilled): Post actualizado en el array 'posts'.");
        } else {
          console.warn("postSlice (likePost.fulfilled): Post no encontrado en el array 'posts' para actualizar. ID:", action.payload._id);
        }

        // 2. Actualiza el post en el array 'userPosts' (si estás en la vista de perfil del usuario)
        const postIndexInUserPosts = state.userPosts.findIndex(post => post._id === action.payload._id);
        if (postIndexInUserPosts !== -1) {
          state.userPosts[postIndexInUserPosts] = action.payload; // Reemplaza el post antiguo con el actualizado
          console.log("postSlice (likePost.fulfilled): Post actualizado en el array 'userPosts'.");
        } else {
          console.warn("postSlice (likePost.fulfilled): Post no encontrado en el array 'userPosts' para actualizar.");
        }

        // 3. Actualiza el post individual en 'state.post' (si estás en la vista de detalle de un post)
        if (state.post && state.post._id === action.payload._id) {
          state.post = action.payload;
          console.log("postSlice (likePost.fulfilled): Post individual actualizado en 'state.post'.");
        } else {
            console.warn("postSlice (likePost.fulfilled): Post individual NO actualizado en 'state.post' (ID no coincide o state.post es nulo). ID:", action.payload._id);
        }

        // Logs de depuración para verificar el estado después de la actualización
        console.log("postSlice (likePost.fulfilled): Estado 'posts' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.posts)));
        console.log("postSlice (likePost.fulfilled): Estado 'post' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.post)));
        console.log("postSlice (likePost.fulfilled): Estado 'userPosts' DESPUÉS de la actualización:", JSON.parse(JSON.stringify(state.userPosts)));
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Error al dar/quitar like:", action.payload);
      });
      /*.addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })*/;
      
  },
});
     




export const { reset } = postSlice.actions; 
export default postSlice.reducer;