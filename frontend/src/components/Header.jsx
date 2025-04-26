import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="border-base-300 bg-base-100/80 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto h-14 px-4 sm:h-16">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-all hover:opacity-80"
            >
              <img className="size-6" src="./logo.svg" alt="logo" />
              <h1 className="text-lg font-bold">Reacti-Do</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
