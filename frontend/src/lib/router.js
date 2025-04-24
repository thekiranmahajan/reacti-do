import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import { isAuthenticated } from "./constants";

const allowOnlyAuthenticated = () => {
  return isAuthenticated ? null : redirect("/login");
};
const allowOnlyUnauthenticated = () => {
  return !isAuthenticated ? null : redirect("/");
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        loader: allowOnlyAuthenticated,
        Component: HomePage,
      },
      {
        path: "/profile",
        loader: allowOnlyAuthenticated,
        Component: ProfilePage,
      },
      {
        path: "/login",
        loader: allowOnlyUnauthenticated,
        Component: LoginPage,
      },
      {
        path: "/signup",
        loader: allowOnlyUnauthenticated,
        Component: SignupPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
    ],
  },
]);

export default router;
