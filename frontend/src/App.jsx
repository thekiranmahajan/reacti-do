import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="font-JosefinSans">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
