import {AxiosResponse} from "axios";
import {useAxios} from "../axios";
import {API_ENDPOINT} from "../../constants";
import {GoogleLoginRequest, LoginRequest, LoginResponse} from "../../types/auth";

const loginAPI = (
  data: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  return useAxios.post(API_ENDPOINT.LOGIN, data);
};

const googleLoginAPI = (
  data: GoogleLoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  return useAxios.post(API_ENDPOINT.GOOGLE_LOGIN, data);
};


export { loginAPI, googleLoginAPI };
