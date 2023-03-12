import axios, {AxiosError, InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { toast } from 'react-toastify';
import {showToast} from "./toast";

export const useAxios = axios.create({
  baseURL: process.env.REACT_APP_ROOT_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return status >= 200 && status <= 399;
  },
});

const onResponseError = (error: AxiosError<any>): Promise<AxiosError> => {
  const response = error.response;
  if(error.code === "ERR_NETWORK"){
    showToast("error", "Something went wrong!")
  }
  if(response?.status === 400){
    showToast("error", response.data.error)
  }
  if(response?.status === 401){
    showToast("error", "Authentication Failed!")
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if(localStorage.getItem('accessToken')){
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization= `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

useAxios.interceptors.request.use(onRequest, onRequestError);
useAxios.interceptors.response.use(onResponse, onResponseError);
