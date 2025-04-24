const AuthenticationRightSide = ({ heading, subHeading, illustration }) => {
  return (
    <div className="bg-base-200 hidden items-center justify-center p-12 lg:flex">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <img
            className="h-full w-full object-contain"
            src={illustration}
            alt="illustration"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
        <p className="text-base-content/60">{subHeading}</p>
      </div>
    </div>
  );
};

export default AuthenticationRightSide;
