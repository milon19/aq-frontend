import {createSlice, createAsyncThunk, AsyncThunk, isAnyOf} from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { clearSession } from "../../services/auth";
import {AuthState, GoogleLoginRequest, LoginRequest, LoginResponse} from "../../types/auth";
import {googleLoginAPI, loginAPI} from "../../services/apis/authAPIs";
import {showToast} from "../../services/toast";

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

export const Login:AsyncThunk<LoginResponse, LoginRequest, {}> = createAsyncThunk(
  'auth/login', async (data) => {
    const response = await loginAPI(data);
    return response.data;
  });

export const GoogleLogin:AsyncThunk<LoginResponse, GoogleLoginRequest, {}> = createAsyncThunk(
  'auth/google-login', async (data) => {
    const response = await googleLoginAPI(data);
    return response.data;
  });


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearSession();
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(Login.pending, GoogleLogin.pending), state => {
      state.loading = true;
    }).addMatcher(isAnyOf(Login.fulfilled, GoogleLogin.fulfilled), (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      showToast("success", "Login Successful");
    }).addMatcher(isAnyOf(Login.rejected, GoogleLogin.rejected), state => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;