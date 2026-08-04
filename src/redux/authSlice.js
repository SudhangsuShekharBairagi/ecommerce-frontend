import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register } from '../api/productsApi';

const getInitialState = () => ({
  token: typeof window !== 'undefined' ? window.localStorage.getItem('token') || null : null,
  role: typeof window !== 'undefined' ? window.localStorage.getItem('role') || null : null,
  username: typeof window !== 'undefined' ? window.localStorage.getItem('username') || null : null,
  loading: false,
  error: null,
});

const initialState = getInitialState();

export const loginThunk = createAsyncThunk('auth/login', async (credentials) => {
  const data = await login(credentials);
  return data;
});

export const registerThunk = createAsyncThunk('auth/register', async (registrationData) => {
  const data = await register(registrationData);
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.username = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.username = action.payload.username;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('role', action.payload.role);
        localStorage.setItem('username', action.payload.username);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
