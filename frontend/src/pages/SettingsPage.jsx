import { X } from "lucide-react";
import { THEMES } from "../lib/constants";
import useThemeStore from "../store/useThemeStore";
import { Link } from "react-router";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="container mx-auto min-h-screen max-w-5xl px-4 py-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-base-content/70 text-sm">
              Choose a theme for your Todo interface
            </p>
          </div>
          <Link to="/">
            <X className="opacity-80 hover:opacity-100 md:size-7" />
          </Link>
        </div>
        {/* Themes */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors ${
                theme === t
                  ? "bg-base-200 ring-secondary ring-2"
                  : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                data-theme={t}
                className="relative h-8 w-full overflow-hidden rounded-sm"
                title={t.charAt(0).toUpperCase() + t.slice(1)}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="bg-primary border-base-300 rounded border-2"></div>
                  <div className="bg-secondary border-base-300 rounded border-2"></div>
                  <div className="bg-accent border-base-300 rounded border-2"></div>
                  <div className="bg-neutral border-base-300 rounded border-2"></div>
                </div>
              </div>
              <span className="w-full truncate text-center text-xs font-medium">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
