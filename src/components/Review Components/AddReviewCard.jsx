import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import user from "../../service/appwrite/auth";
import reviewService from "../../service/appwrite/reviewService";
import { useNavigate } from "react-router-dom";
import { ReviewContext } from "../../Context/reviewContext";

const AddReviewCard = ({ updaitedData }) => {
  // console.log(updaitedData.title)
  const { register, handleSubmit,reset } = useForm({
    defaultValues:{
      title:updaitedData?.title||"",
      description:updaitedData?.description||""

    }
  });
  const nevigate = useNavigate();
  const { userData } = useContext(ReviewContext);

  useEffect(() => {
  if (updaitedData) {
    reset({
        title: updaitedData.title || "",
        description: updaitedData?.description || "",
        review:updaitedData?.review||""
      });
  }
}, [updaitedData]);

  const Submit = async (data) => {
    if (updaitedData) {
      const file = data.image?.[0] ? data.image[0] : null;
      // console.log(file)
      if (file) {
       await reviewService.delImage(updaitedData.imageId);
        const imageId =await  reviewService.uplodeImage(file);
        data.imageId = imageId.$id;
      }
      
      const isUpdated=await reviewService.updateReview(updaitedData.$id,{
        ...data,     
      });
      if(isUpdated){
        nevigate("/");

      }

    } else {
      const file = data.image[0];

      const imgId = await reviewService.uplodeImage(file);

      data.imageId = imgId.$id;
      // console.log(userData)
      reviewService.createReview({
        ...data,
        userId: userData.$id,
        username: userData.name,
      });

      nevigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Add Review</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(Submit)}>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("title")}
          />

          <textarea
            placeholder="description"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("description")}
          />

          <textarea
            placeholder="review"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("review")}
          />
          {/* <input
            type="text"
            placeholder="rating"
            className="border border-gray-300 p-2 rounded-md focus:outline-none"
            {...register("rating")}
          /> */}
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

export default AddReviewCard;
