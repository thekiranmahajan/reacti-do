import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import InputField from "../components/InputField.jsx";
import { Link } from "react-router";
import AuthenticationRightSide from "../components/AuthenticationRightSide.jsx";
import loginIllustration from "../assets/login.svg";
import { Lock, Mail, Loader2 } from "lucide-react";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <main className="grid h-screen lg:grid-cols-2" role="main">
      {/* Left Side */}
      <div className="flex flex-col items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <img className="size-14" src="./logo.svg" alt="logo" />
              <h1 id="login-heading" className="mt-2 text-2xl font-bold">
                Welcome back
              </h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form
            aria-labelledby="login-heading"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <InputField
              type="text"
              fieldName="email"
              placeholder="kiran@example.com"
              label="Email"
              icon={Mail}
              formData={formData}
              setFormData={setFormData}
            />
            <InputField
              type={showPassword ? "text" : "password"}
              fieldName="password"
              placeholder="••••••••"
              label="Password"
              icon={Lock}
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full rounded-lg"
              disabled={isLoggingIn}
              aria-busy={isLoggingIn}
              aria-label={isLoggingIn ? "login account..." : "login account"}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center text-sm">
            <p className="text-base-content/60">Don&apos;t have an account?</p>{" "}
            <Link
              to="/signup"
              className="link link-primary"
              aria-label="Sign-up to new account"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthenticationRightSide
        illustration={loginIllustration}
        heading="Welcome back to Reacti-Do!"
        subHeading="Sign in to organize your tasks and achieve your goals."
        aria-hidden="true"
      />
    </main>
  );
};

export default LoginPage;
