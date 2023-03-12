import {LoginResponse} from "../types/auth";

export const setSession = (res: LoginResponse) => {
  localStorage.setItem('accessToken', res.access);
  localStorage.setItem('refreshToken', res.refresh);
}

export const clearSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}