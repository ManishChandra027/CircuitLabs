import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import user from "../../service/appwrite/auth";
import { ReviewContext } from "../../Context/reviewContext";
import profileService from "../../service/appwrite/profileService";

const UpdateProfile = ({ updaitedData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bio: updaitedData?.bio || "",
      avatarId: updaitedData?.avatarId || "",
    },
  });

  const nevigate = useNavigate();
  //   const { userData } = useContext(ReviewContext);

  useEffect(() => {
    if (updaitedData) {
      reset({
        bio: updaitedData?.title || "",
        avatarId: updaitedData?.avatarId || "",
      });
    }
  }, [updaitedData]);

  const Submit = async (data) => {
    if (true) {
      const file = data.image?.[0] ? data.image[0] : null;
      // console.log(file)
      if (file) {
        if (updaitedData) {
          // await profileService.delImage(updaitedData?.avatarId);
        }
        const imageId = await profileService.uplodeImage(file);
        data.avatarId = imageId.$id;
      }

      const isUpdated = await profileService.updateProfile(updaitedData.$id, {
        ...data,
      });
      if (isUpdated) {
        nevigate("/");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">
          update Profile
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(Submit)}>
          <textarea
            placeholder="bio"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("bio")}
          />

          <input
            type="file"
            placeholder="add image"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("image")}
          />

          <button className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
