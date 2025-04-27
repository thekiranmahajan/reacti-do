import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useTodoItemStore = create((set, get) => ({
  isItemsLoading: false,
  todoItems: [],
  isSelectedItemLoading: false,
  selectedItem: null,

  getItems: async (listId) => {
    set({ isItemsLoading: true });
    try {
      const { data } = await axiosInstance.get(`/todoitem/list/${listId}`);
      set({ todoItems: data });
    } catch (error) {
      console.log("Error in getItems fn", error);
      toast.error(error.response?.data?.message);
      set({ todoItems: [] });
    } finally {
      set({ isItemsLoading: false });
    }
  },

  getItem: async (itemId) => {
    set({ isSelectedItemLoading: true });
    try {
      const { data } = await axiosInstance.get(`/todoitem/${itemId}`);
      set({ selectedItem: data });
    } catch (error) {
      console.log("Error in getItem fn", error);
      toast.error(error.response?.data?.message);
      set({ selectedItem: null });
    } finally {
      set({ isSelectedItemLoading: false });
    }
  },

  createItem: async ({ text, todoList }) => {
    try {
      const { data } = await axiosInstance.post("/todoitem/create", {
        text,
        todoList,
      });
      set({ todoItems: [...get().todoItems, data] });
      toast.success("Todo item created successfully!");
    } catch (error) {
      console.log("Error in createItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },

  updateItem: async (itemId, { text, isCompleted }) => {
    try {
      const { data } = await axiosInstance.patch(`/todoitem/update/${itemId}`, {
        text,
        isCompleted,
      });
      set({
        todoItems: get().todoItems.map((item) =>
          item._id === data._id ? data : item,
        ),
        selectedItem:
          get().selectedItem && get().selectedItem._id === data._id
            ? data
            : get().selectedItem,
      });
      toast.success("Todo item updated successfully!");
    } catch (error) {
      console.log("Error in updateItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },
  deleteItem: async (itemId) => {
    try {
      await axiosInstance.delete(`/todoitem/delete/${itemId}`);
      set({
        todoItems: get().todoItems.filter((item) => item._id !== itemId),
        selectedItem:
          get().selectedItem && get().selectedItem._id === itemId
            ? null
            : get().selectedItem,
      });
      toast.success("Todo item deleted successfully!");
    } catch (error) {
      console.log("Error in deleteItem fn", error);
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useTodoItemStore;
