import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

const useTodoListStore = create((set) => ({
  isLoadingTodoLists: false,
  todoLists: [],
  getTodoLists: async () => {
    set({ isLoadingTodoLists: true });
    try {
      const { data } = await axiosInstance.get("/todolist");
      set({ todoLists: data });
    } catch (error) {
      console.log("Error in getTodoLists fn", error);
      set({ todoLists: [] });
    } finally {
      set({ isLoadingTodoLists: false });
    }
  },
}));

export default useTodoListStore;
