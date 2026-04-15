import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import reviewService from "../../service/appwrite/reviewService";
import { useNavigate } from "react-router-dom";
import { ReviewContext } from "../../Context/reviewContext";
import TextEditor from "./TextEditor/TextEditor";

const PostForm = ({ existingPost }) => {
  const { register, handleSubmit, reset, control, getValues } = useForm({
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
          if (existingPost.imageId)
            await reviewService.delImage(existingPost.imageId);
          const imageRes = await reviewService.uplodeImage(file);
          updatedData.imageId = imageRes.$id;
        }
        await reviewService.updateReview(existingPost.$id, updatedData);
        navigate("/");
      } else {
        if (!file) {
          alert("Please select an image");
          return;
        }
        const imageRes = await reviewService.uplodeImage(file);
        updatedData.imageId = imageRes.$id;
        await reviewService.createReview({
          ...updatedData,
          userId: userData.$id,
          username: userData.name,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const inputClass =
    "w-full bg-white border border-[#e0ddd8] text-[#111] text-sm p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] placeholder-[#bbb] transition-colors";
  const labelClass = "text-xs text-[#888] font-medium block mb-1";

  return (
    <div className="min-h-[80vh] bg-[#FAF9F6] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-1">
            {existingPost ? "Editing" : "New Post"}
          </p>
          <h1 className="text-2xl font-bold text-[#111]">
            {existingPost ? "Edit your post" : "Write something"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {/* Mobile: flex-col | Desktop: flex-row */}
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
            {/* ── LEFT PANEL (mobile: full width, desktop: fixed 288px) ── */}
            <div className="w-full lg:w-92 lg:shrink-0  bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              {/* Title */}
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  placeholder="Give your post a title..."
                  className={inputClass}
                  {...register("title", { required: true })}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Short Description</label>
                <textarea
                  placeholder="A brief summary of your post..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                  {...register("description")}
                />
              </div>

              {/* Cover image */}
              <div>
                <label className={labelClass}>Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-[#888] file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#111] file:text-white file:cursor-pointer hover:file:bg-[#333] transition-colors"
                  {...register("image")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors cursor-pointer mt-auto"
              >
                {existingPost ? "Update Post" : "Publish Post"}
              </button>
            </div>

            {/* ── RIGHT PANEL (mobile: full width, desktop: flex-1) ── */}
            <div className="w-full max-w-2xl bg-white border border-[#e8e6e1] rounded-2xl p-6 shadow-sm">
              <label className={labelClass}>Content</label>
              <div className="rounded-lg overflow-hidden border border-[#e0ddd8] focus-within:border-[#0891B2] transition-colors mt-1">
                <TextEditor
                  control={control}
                  name="review"
                  defaultValue={getValues("review")}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
