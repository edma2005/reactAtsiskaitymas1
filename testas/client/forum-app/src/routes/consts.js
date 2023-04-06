import AddPost from "../pages/addPost/AddPost";
import AuthLayout from "../layouts/AuthLayout";
import EditPage from "../pages/editPage/EditPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MainLayout from "../layouts/MainLayout";
import Post from "../pages/post/Post";
import Register from "../pages/register/Register";

export const HOME_PATH = "/";
export const ADD_PATH = "/add";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const POST_PATH = "/question/:id";
export const EDIT_PATH = "/myquestions";

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: POST_PATH, Component: Post },
    { path: ADD_PATH, Component: AddPost },
    { path: EDIT_PATH, Component: EditPage },
  ],
};

export const authLayoutRoutes = {
  Layout: AuthLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: LOGIN_PATH, Component: Login },
    { path: REGISTER_PATH, Component: Register },
  ],
};
