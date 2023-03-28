import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Add from "../components/AddForm";

export const HOME_PATH = "/";
export const LOGIN_PATH = `${HOME_PATH}login`;
export const REGISTER_PATH = `${HOME_PATH}register`;
export const ADD_PATH = `${HOME_PATH}add`;

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    {
      path: HOME_PATH,
      Component: Home,
    },
    {
      path: LOGIN_PATH,
      Component: Login,
    },
    {
      path: REGISTER_PATH,
      Component: Register,
    },
    {
      path: ADD_PATH,
      Component: Add,
    },
  ],
};
