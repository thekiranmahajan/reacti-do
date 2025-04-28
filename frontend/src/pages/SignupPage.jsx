import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import InputField from "../components/InputField.jsx";
import { Link } from "react-router";
import AuthenticationRightSide from "../components/AuthenticationRightSide.jsx";
import signupIllustration from "../assets/signup.svg";
import { Lock, Mail, Loader2, User } from "lucide-react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    signup(formData);
  };
  return (
    <main className="grid h-screen lg:grid-cols-2" role="main">
      {/* Left Side */}
      <div className="flex flex-col items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <img
                className="size-14"
                src="./logo.svg"
                alt="Reacti-Do Logo"
                role="img"
              />
              <h1 id="signup-heading" className="mt-2 text-2xl font-bold">
                Create Account
              </h1>
              <p className="text-base-content/60">Get started with Reacti-Do</p>
            </div>
          </div>
          <form
            aria-labelledby="signup-heading"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <InputField
              type="text"
              fieldName="fullName"
              placeholder="Kiran Mahajan"
              label="Full Name"
              icon={User}
              formData={formData}
              setFormData={setFormData}
            />
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
              className="btn btn-primary w-full"
              disabled={isSigningUp}
              aria-busy={isSigningUp}
              aria-label={
                isSigningUp ? "Creating account..." : "Create account"
              }
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center text-sm">
            <p className="text-base-content/60">Already have an account?</p>{" "}
            <Link
              to="/login"
              className="link link-primary"
              aria-label="Sign in to existing account"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthenticationRightSide
        illustration={signupIllustration}
        heading="Join Reacti-Do Today!"
        subHeading="Create an account to organize your tasks and achieve your goals."
        aria-hidden="true"
      />
    </main>
  );
};

export default SignupPage;
