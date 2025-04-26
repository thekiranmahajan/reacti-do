import React, { useEffect } from "react";
import useTodoListStore from "../store/useTodoListStore";
import useAuthStore from "../store/useAuthStore";

const HomePage = () => {
  const { todoLists, getTodoLists } = useTodoListStore();
  const { authUser } = useAuthStore();
  console.log(todoLists);

  useEffect(() => {
    if (!authUser) return;
    getTodoLists();
  }, [getTodoLists, authUser]);

  return <div>HomePage</div>;
};

export default HomePage;
