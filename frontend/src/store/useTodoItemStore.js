import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useTodoItemStore = create((set, get) => ({
  isLoadingTodoItems: false,
  todoItems: [],
  isLoadingSelectedTodoItem: false,
  selectedTodoItem: null,

  getTodoItems: async (listId) => {
    set({ isLoadingTodoItems: true });
    try {
      const { data } = await axiosInstance.get(`/todoitem/list/${listId}`);
      set({ todoItems: data });
    } catch (error) {
      console.log("Error in getTodoItems fn", error);
      toast.error(error.response?.data?.message);
      set({ todoItems: [] });
    } finally {
      set({ isLoadingTodoItems: false });
    }
  },

  getTodoItem: async (itemId) => {
    set({ isLoadingSelectedTodoItem: true });
    try {
      const { data } = await axiosInstance.get(`/todoitem/${itemId}`);
      set({ selectedTodoItem: data });
    } catch (error) {
      console.log("Error in getTodoItem fn", error);
      toast.error(error.response?.data?.message);
      set({ selectedTodoItem: null });
    } finally {
      set({ isLoadingSelectedTodoItem: false });
    }
  },

  createTodoItem: async ({ text, todoList }) => {
    try {
      const { data } = await axiosInstance.post("/todoitem/create", {
        text,
        todoList,
      });
      set({ todoItems: [...get().todoItems, data] });
      toast.success("Todo item created successfully!");
    } catch (error) {
      console.log("Error in createTodoItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },

  updateTodoItem: async (itemId, { text, isCompleted }) => {
    try {
      const { data } = await axiosInstance.patch(`/todoitem/update/${itemId}`, {
        text,
        isCompleted,
      });
      set({
        todoItems: get().todoItems.map((item) =>
          item._id === data._id ? data : item,
        ),
        selectedTodoItem:
          get().selectedTodoItem && get().selectedTodoItem._id === data._id
            ? data
            : get().selectedTodoItem,
      });
      toast.success("Todo item updated successfully!");
    } catch (error) {
      console.log("Error in updateTodoItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },

  deleteTodoItem: async (itemId) => {
    try {
      await axiosInstance.delete(`/todoitem/delete/${itemId}`);
      set({
        todoItems: get().todoItems.filter((item) => item._id !== itemId),
        selectedTodoItem:
          get().selectedTodoItem && get().selectedTodoItem._id === itemId
            ? null
            : get().selectedTodoItem,
      });
      toast.success("Todo item deleted successfully!");
    } catch (error) {
      console.log("Error in deleteTodoItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useTodoItemStore;
