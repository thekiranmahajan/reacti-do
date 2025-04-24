import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    console.log("Auth State:", {
      authUser,
      isCheckingAuth,
    });
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="font-JosefinSans">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
