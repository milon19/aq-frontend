import React, {useEffect} from 'react';
import Page from "../Page";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import { Password } from 'primereact/password';

import {useFormik, FormikProps} from 'formik';
import * as Yup from 'yup';

import styles from "../../styles/auth/Login.module.css";
import {LoginRequest} from "../../types/auth";
import {selectAuth, Login as EmailLogin, GoogleLogin} from "../../redux/slices/authSlices";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Loading from "../../components/loading/Loading";
import {Navigate} from "react-router-dom";
import {PATH} from "../../constants";
import {showToast} from "../../services/toast";


const LoginSchema = Yup.object().shape(
  {
    email: Yup.string().email("Invalid email").required("Email is Required."),
    password: Yup.string().required("Password is Required.")
  }
)


const Login = () => {
  const initialValues: LoginRequest = {
    email: '',
    password: ''
  }
  const formik: FormikProps<LoginRequest> = useFormik<LoginRequest>({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      dispatch(EmailLogin(data));
    }
  });

  const isFormFieldInvalid = (name: keyof LoginRequest) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: keyof LoginRequest) => {
    return isFormFieldInvalid(name) ? <small className="mb-3 p-error">{formik.errors[name]}</small> : <small className="mb-3 p-error">&nbsp;</small>;
  };
  const dispatch = useAppDispatch();
  const {
    loading,
    isAuthenticated,
  } = useAppSelector(selectAuth);

  const handleCallBackResponse = (response: any) => {
    dispatch(GoogleLogin({"id_token": response.credential}));
  }

  useEffect(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallBackResponse
    })

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn"),
      { theme: "filled_blue", size: "large"}
    )
  }, [])
  if(loading){
    return <Loading/>
  }
  if(isAuthenticated) {
    return <Navigate replace to={PATH.HOME} />
  }

  return (
    <Page title={"Login"}>
      <div className={`flex justify-content-center ${styles.loginPage}`}>
        <div className="flex align-items-center justify-content-center w-full">
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
              <span className="text-600 font-medium line-height-3">Don't have an account?</span>
              <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Join today!</a>
              <span className="block text-600 font-medium line-height-3">Or</span>
              <div id="googleLoginBtn" className="flex justify-content-center align-items-center p-3">
              </div>
              <Button className="bg-white py-0 px-2 mb-1 text-green-900 font-bold line-height-4 hover:bg-black-alpha-40"
                      onClick={() => showToast("warning", "WIP")}
              >
                <img alt="googleButton" src="/btn_github.png" className={styles.githubButton}/> Sign in with GitHub
              </Button>
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className="block text-900 font-medium mb-2">Email: </label>
                <InputText
                  id="email"
                  placeholder="Enter your Email"
                  className={classNames("w-full",{ 'p-invalid': isFormFieldInvalid('email') })}
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value)
                  }}
                />
                {getFormErrorMessage('email')}
                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                <Password
                  id="password"
                  placeholder="Enter your Password"
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value)
                  }}
                  feedback={false}
                  toggleMask
                  className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('password') })}
                  inputStyle={{width: "100%"}}
                />
                {getFormErrorMessage('password')}
                <div className="flex align-items-center justify-content-between mb-3">
                  <a className="font-medium no-underline text-blue-500 text-right cursor-pointer" >Forgot your password?</a>
                </div>
                <Button label="Login" icon="pi pi-user" className="w-full" />
              </form>
            </div>
          </div>
        </div>

      </div>
    </Page>
  );
};

export default Login;