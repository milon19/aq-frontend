import {User} from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = {
  access: string,
  refresh: string
}

export type AuthState = {
  user: User | null,
  loading: boolean,
  isAuthenticated: boolean,
};

export interface GoogleLoginRequest {
  id_token: string;
}