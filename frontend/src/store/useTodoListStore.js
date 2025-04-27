import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useTodoListStore = create((set, get) => ({
  isListsLoading: false,
  lists: [],
  isListItemsLoading: false,

  selectedListId: null,
  setSelectedListId: (selectedListId) => {
    set({ selectedListId });
  },

  getLists: async () => {
    set({ isListsLoading: true });
    try {
      const { data } = await axiosInstance.get("/todolist");
      set({ lists: data });
    } catch (error) {
      console.log("Error in getLists fn", error);
      toast.error(error.response?.data?.message);
      set({ lists: [] });
    } finally {
      set({ isListsLoading: false });
    }
  },

  getList: async (listId) => {
    set({ isListItemsLoading: true });
    try {
      const { data } = await axiosInstance.get(`/todolist/${listId}`);
      set({ selectedListId: data?._id });
    } catch (error) {
      console.log("Error in getList fn", error);
      toast.error(error.response?.data?.message);
      set({ selectedListId: null });
    } finally {
      set({ isListItemsLoading: false });
    }
  },

  createList: async (todoListName) => {
    try {
      const { data } = await axiosInstance.post("/todolist/create", {
        todoListName,
      });

      set((state) => ({
        lists: [...state.lists, data],
        selectedListId: data?._id,
      }));
      toast.success("TodoList created successfully!");
    } catch (error) {
      console.log("Error in createList fn", error);
      toast.error(error.response?.data?.message);
    }
  },
  updateList: async (listId, todoListName) => {
    try {
      const { data } = await axiosInstance.patch(`/todolist/update/${listId}`, {
        todoListName,
      });
      set({
        lists: get().lists.map((list) => (list._id === data._id ? data : list)),
        selectedListId:
          get().selectedListId && get().selectedListId._id === data._id
            ? data
            : get().selectedListId,
      });
      toast.success("TodoList updated successfully!");
    } catch (error) {
      console.log("Error in updateList fn", error);
      toast.error(error.response?.data?.message);
    }
  },

  deleteList: async (listId) => {
    try {
      await axiosInstance.delete(`/todolist/delete/${listId}`);
      set({
        lists: get().lists.filter((list) => list._id !== listId),
        selectedListId:
          get().selectedListId && get().selectedListId._id === listId
            ? null
            : get().selectedListId,
      });
      toast.success("TodoList deleted successfully!");
    } catch (error) {
      console.log("Error in deleteList fn", error);
      toast.error(error.response?.data?.message);
    }
  },
}));

export default useTodoListStore;
