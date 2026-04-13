import React, { useState } from "react";
import { useForm } from "react-hook-form";
import user from "../../service/appwrite/auth";
import { ReviewContext } from "../../Context/reviewContext";
import { useNavigate } from "react-router";
import { useContext } from "react";

const LoginCard = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setStatus, setUserData } = useContext(ReviewContext);

  const handleLogin = async (formData) => {
    setError("");
    try {
      const session = await user.login(formData);
      if (!session) throw new Error("Account Login failed");

      const currentData = await user.getAccount();
      if (!currentData) throw new Error("Failed to Fetch current Account");

      setStatus(true);
      setUserData(currentData);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const inputClass = "w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-[#444] p-2.5 rounded-lg focus:outline-none focus:border-[#06B6D4] transition-colors text-sm";
  const labelClass = "text-xs text-[#666] block mb-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f]">
      <div className="bg-[#141414] border border-[#1e1e1e] p-7 rounded-xl w-full max-w-sm">

        <h1 className="text-lg font-medium text-white text-center mb-6">
          Welcome back
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>

          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={inputClass}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className={inputClass}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#06B6D4] text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#0891B2] transition-colors mt-1"
          >
            Login
          </button>

        </form>

        <p className="text-xs text-[#555] text-center mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#06B6D4] cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginCard;