const Header = () => {
  return (
    <header className="border-base-300 bg-base-100/80 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto h-14 px-4 sm:h-16">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="flex items-center gap-2.5 transition-all hover:opacity-80"
            >
              <img className="size-6" src="./logo.svg" alt="logo" />
              <h1 className="text-lg font-bold">Reacti-Do</h1>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
