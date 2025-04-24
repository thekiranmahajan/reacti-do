import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="font-JosefinSans">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
