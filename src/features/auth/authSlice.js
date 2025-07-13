import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user") || null);
const token = JSON.parse(localStorage.getItem("token") || null);

const initialState = {
  user: user,
  token: token,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false), (state.isSuccess = false), (state.isLoading = false),(state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        (state.isSuccess = true),
        (state.isLoading = false),
        (state.user = action.payload.user),
          (state.token = action.payload.token);
          
      })
      .addCase(login.rejected, (state, action) => {
        (state.isError = true), (state.message = action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
          state.isLoading = false;
        state.isSuccess = true; 
        state.user = null;
        state.token = null;
        state.message = "Sesión cerrada correctamente"; 
        localStorage.removeItem("user"); 
        localStorage.removeItem("token"); ;
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.isSuccess = true), (state.message = action.payload.message) ;
      })
      .addCase(register.rejected, (state, action) => {
        (state.isError = true), (state.message = action.payload);
      });
  },
});

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
                    (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]) ||
                    error.message || error.toString();
    return thunkAPI.rejectWithValue(message); 
  }
});


export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    console.error("Error en thunk de login:", error);
    const message = (error.response && error.response.data && error.response.data.msg) || 
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
    return thunkAPI.rejectWithValue(message); 
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
   
    await authService.logout(); 
   
  } catch (error) {
    console.error("Error en thunk de logout:", error);
    const message = (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
    return thunkAPI.rejectWithValue(message); 
  }
});
export const { reset } = authSlice.actions;

export default authSlice.reducer;