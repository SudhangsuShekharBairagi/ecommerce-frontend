import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editProfile, getProfile } from '../api/productsApi';

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const data = await getProfile();
  return data;
});

export const editProfileThunk = createAsyncThunk('profile/editProfile', async (formData) => {
  const response = await editProfile(formData);
  return response;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(editProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
