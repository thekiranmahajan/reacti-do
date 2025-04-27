import { useEffect } from "react";
import useTodoListStore from "../store/useTodoListStore";
import useTodoItemStore from "../store/useTodoItemStore";
import useAuthStore from "../store/useAuthStore";
import TodoItems from "../components/TodoItems";
import { Loader2 } from "lucide-react";
import TodoLists from "../components/TodoLists";
import { Link } from "react-router";

const HomePage = () => {
  const { getItems } = useTodoItemStore();
  const { getLists, lists, selectedListId, setSelectedListId } =
    useTodoListStore();

  const { authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!authUser) return;
    getLists();
  }, [getLists, authUser]);

  useEffect(() => {
    if (selectedListId) {
      getItems(selectedListId);
    }
  }, [selectedListId, getItems]);

  useEffect(() => {
    if (lists?.length > 0 && !selectedListId) {
      setSelectedListId(lists[0]._id);
    }
  }, [lists, selectedListId, setSelectedListId]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold">
          Please login to access your todos
        </h1>
        <p className="text-base-content/60 mt-2">
          You need to be logged in to view and manage your todo lists.
        </p>
        <Link to="/login" className="btn btn-primary mt-4">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-screen flex-col gap-5 p-4 md:flex-row">
      <div className="bg-base-200 flex rounded-md shadow-sm md:w-1/4">
        <TodoLists />
      </div>
      <div className="bg-base-200 flex-1 rounded-md p-4 shadow-sm">
        <TodoItems />
      </div>
    </div>
  );
};

export default HomePage;
