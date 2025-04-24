import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check-auth");

      set({ authUser: data });
    } catch (error) {
      console.log("Error in checkAuth fn", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const { data } = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signup fn", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });

    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      set({ authUser: data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in login fn", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in logout fn", error);
      toast.error("Error logging out");
    }
  },
  profileUpdate: async (profilePic) => {
    set({ isProfileUpdating: true });
    try {
      const { data } = await axiosInstance.put(
        "/auth/update-profile",
        profilePic,
      );
      set({ authUser: data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in profileUpdate fn", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isProfileUpdating: false });
    }
  },
}));

export default useAuthStore;
