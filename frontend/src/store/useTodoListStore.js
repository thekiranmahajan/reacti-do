import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useTodoListStore = create((set, get) => ({
  isLoadingTodoLists: false,
  todoLists: [],
  isLoadingSelectedTodoList: false,
  selectedTodoList: null,

  getTodoLists: async () => {
    set({ isLoadingTodoLists: true });
    try {
      const { data } = await axiosInstance.get("/todolist");
      set({ todoLists: data });
    } catch (error) {
      console.log("Error in getTodoLists fn", error);
      toast.error(error.response?.data?.message);
      set({ todoLists: [] });
    } finally {
      set({ isLoadingTodoLists: false });
    }
  },

  getTodoList: async (listId) => {
    set({ isLoadingSelectedTodoList: true });
    try {
      const { data } = await axiosInstance.get(`/todolist/${listId}`);
      set({ selectedTodoList: data });
    } catch (error) {
      console.log("Error in getTodoList fn", error);
      toast.error(error.response?.data?.message);
      set({ selectedTodoList: null });
    } finally {
      set({ isLoadingSelectedTodoList: false });
    }
  },

  createTodoList: async (todoListName) => {
    try {
      const { data } = axiosInstance.post("/todolist/create", todoListName);

      set({ todoLists: [...get().todoLists, data] });
      toast.success("TodoList created successfully!");
    } catch (error) {
      console.log("Error in createTodoList fn", error);
      toast.error(error.response?.data?.message);
    }
  },
  updateTodoList: async (listId, todoListName) => {
    try {
      const { data } = await axiosInstance.patch(`/todolist/update/${listId}`, {
        todoListName,
      });
      set({
        todoLists: get().todoLists.map((list) =>
          list._id === data._id ? data : list,
        ),
        selectedTodoList:
          get().selectedTodoList && get().selectedTodoList._id === data._id
            ? data
            : get().selectedTodoList,
      });
      toast.success("TodoList updated successfully!");
    } catch (error) {
      console.log("Error in updateTodoList fn", error);
      toast.error(error.response?.data?.message);
    }
  },

  deleteTodoList: async (listId) => {
    try {
      await axiosInstance.delete(`/todolist/delete/${listId}`);
      set({
        todoLists: get().todoLists.filter((list) => list._id !== listId),
        selectedTodoList:
          get().selectedTodoList && get().selectedTodoList._id === listId
            ? null
            : get().selectedTodoList,
      });
      toast.success("TodoList deleted successfully!");
    } catch (error) {
      console.log("Error in deleteTodoList fn", error);
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useTodoListStore;
