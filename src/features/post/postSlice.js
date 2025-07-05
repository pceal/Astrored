// src/features/post/postSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService"; 

const initialState = {
  posts: [], // El array de publicaciones
  post: {},  // Para un post individual
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

export const postSlice = createSlice({
  name: "post", // El nombre interno del slice sigue siendo "post" (singular)
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.posts = []; // Vacía el array de posts al resetear
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
        state.isSuccess = false; 
        state.message = ""; 
       // console.log("DEBUG postSlice (getAll.pending): Petición de posts pendiente.");
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.posts = Array.isArray(action.payload.posts) ? action.payload.posts : []; 
        state.message = "Publicaciones cargadas exitosamente";
        //console.log("DEBUG postSlice (getAll.fulfilled): Publicaciones cargadas. Payload:", action.payload);
        //console.log("DEBUG postSlice (getAll.fulfilled): Estado final de posts (después de corrección):", state.posts);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; 
        state.posts = []; // Limpia las publicaciones en caso de error
       // console.error("DEBUG postSlice (getAll.rejected): Error al cargar publicaciones. Mensaje:", action.payload);
       // console.error("DEBUG postSlice (getAll.rejected): Estado final de posts:", state.posts);
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.post = null; // Limpia el post anterior mientras carga el nuevo
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload; 
        state.message = "Publicación individual cargada exitosamente";
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.post = null; 
      });
  },
});

export const { reset } = postSlice.actions; 
export default postSlice.reducer;