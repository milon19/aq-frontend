import React, { Suspense, lazy } from "react";

import { Navigate, useRoutes } from "react-router-dom";

import LoadingScreen from "./components/loading/Loading";

const Loadable = (Component: React.FC) => (props: any) => {
  return (
    <Suspense
      fallback={
        <LoadingScreen/>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function RouteApp() {
  return useRoutes([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/play-ground",
      element: <PlayGround/>
    },
    { path: "*", element: <Navigate to="/404" replace /> }
  ])
}

const Home = Loadable(lazy(() => import("./pages/Home")));
const Login = Loadable(lazy(() => import("./pages/auth/Login")));
const PlayGround = Loadable(lazy(() => import("./pages/PlayGround")))