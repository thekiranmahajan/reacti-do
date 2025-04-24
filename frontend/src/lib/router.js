import { createBrowserRouter, redirect } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import useAuthStore from "../store/useAuthStore";

const checkAuth = (shouldBeAuthenticated) => {
  const authUser = useAuthStore.getState().authUser;

  if (shouldBeAuthenticated && !authUser) {
    return redirect("/login");
  }
  if (!shouldBeAuthenticated && authUser) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        loader: () => checkAuth(true),
        Component: HomePage,
      },
      {
        path: "/profile",
        loader: () => checkAuth(true),
        Component: ProfilePage,
      },
      {
        path: "/login",
        loader: () => checkAuth(false),
        Component: LoginPage,
      },
      {
        path: "/signup",
        loader: () => checkAuth(false),
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
