import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import user from "../../service/appwrite/auth";
import { ReviewContext } from "../../Context/reviewContext";
import { useNavigate } from "react-router";
import profileService from "../../service/appwrite/profileService";

const SignupCard = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const nevigate = useNavigate();
  const { status, userData, setStatus, setUserData} =
    useContext(ReviewContext);

  const Submit = async (data) => {
    setError("");
    try {
      const session = await user.createAccount(data);

      if (session) {
        const currUserdata = await user.getAccount();

        if (currUserdata) {
          setStatus(true);
          setUserData(currUserdata);

          const profileData=await profileService.createProfile({username:currUserdata.name ,userId:currUserdata.$id});
         
          if(profileData){
            nevigate("/");
          }

        }
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(Submit)}>
          <input
            type="text"
            placeholder="name"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("name")}
          />

          <input
            type="email"
            placeholder="eamil"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="password"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("password")}
          />

          <button className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupCard;
