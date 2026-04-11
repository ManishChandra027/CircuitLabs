import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import reviewService from "../../service/appwrite/reviewService";
import { useNavigate } from "react-router-dom";
import { ReviewContext } from "../../Context/reviewContext";

const PostForm = ({ existingPost }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: existingPost?.title || "",
      description: existingPost?.description || "",
      review: existingPost?.review || "",
    },
  });
  const navigate = useNavigate();
  const { userData } = useContext(ReviewContext);

  useEffect(() => {
    if (existingPost) {
      reset({
        title: existingPost.title || "",
        description: existingPost.description || "",
        review: existingPost.review || "",
      });
    }
  }, [existingPost, reset]);

  const handleSubmitForm = async (data) => {
    try {
      const file = data.image?.[0] || null;
      let updatedData = { ...data };

      if (existingPost) {
        if (file) {
          if (existingPost.imageId) await reviewService.delImage(existingPost.imageId);
          const imageRes = await reviewService.uplodeImage(file);
          updatedData.imageId = imageRes.$id;
        }
        await reviewService.updateReview(existingPost.$id, updatedData);
        navigate("/");
      } else {
        if (!file) { alert("Please select an image"); return; }
        const imageRes = await reviewService.uplodeImage(file);
        updatedData.imageId = imageRes.$id;
        await reviewService.createReview({ ...updatedData, userId: userData.$id, username: userData.name });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const inputClass = "w-full bg-[#1e1e1e] border border-[#2a2a2a] text-white text-sm p-2.5 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-[#444] transition-colors";

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 py-12">
      <div className="bg-[#161616] border border-[#2a2a2a] p-6 rounded-xl w-full max-w-md">
        <h1 className="text-lg font-medium text-white mb-5">
          {existingPost ? "Edit Post" : "Add Post"}
        </h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleSubmitForm)}>
          <input type="text" placeholder="Title" className={inputClass} {...register("title", { required: true })} />
          <textarea placeholder="Description" rows={3} className={`${inputClass} resize-none`} {...register("description")} />
          <textarea placeholder="Review" rows={4} className={`${inputClass} resize-none`} {...register("review")} />
          <input type="file" className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-yellow-400 file:text-black file:cursor-pointer" {...register("image")} />

          <button type="submit" className="mt-2 w-full py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors">
            {existingPost ? "Update Post" : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;