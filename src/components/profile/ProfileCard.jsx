import React, { useContext, useEffect, useState } from "react";
import profileService from "../../service/appwrite/profileService";
import { useNavigate, useParams } from "react-router-dom";
import { Query } from "appwrite";
import { ReviewContext } from "../../Context/reviewContext";
import { useForm } from "react-hook-form";

const ProfileCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { userData } = useContext(ReviewContext);
  const isAuthor = userData && slug ? userData.$id === slug : false;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { bio: "", avatarId: "" },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!slug) return;
        const data = await profileService.getProfiles([
          Query.equal("userId", slug),
        ]);
        if (!data || data.documents.length === 0)
          throw new Error("No profile found");
        setProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchProfile();
  }, [slug]);

  useEffect(() => {
    if (profile?.$id)
      reset({ bio: profile.bio || "", avatarId: profile.avatarId || "" });
  }, [profile, reset]);

  const handleUpdate = async (data) => {
    try {
      let updatedData = { ...data };
      const file = data.image?.[0] || null;
      if (file) {
        if (profile?.avatarId) await profileService.delImage(profile.avatarId);
        const imageRes = await profileService.uplodeImage(file);
        updatedData.avatarId = imageRes.$id;
      }
      await profileService.updateProfile(profile.$id, updatedData);
      setIsEdit(false);
      navigate(`/profile/${slug}`);
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-[#e8e6e1] border-t-[#0891B2] rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-xs w-full mx-auto mt-2 p-6  flex flex-col items-center text-center ">
      {isEdit ? (
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="w-full flex flex-col items-center gap-4"
        >
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <div className="relative w-54 h-54 rounded-full overflow-hidden border-2 border-[#0891B2]">
              <img
                className="w-full h-full object-cover"
                src={
                  profile.avatarId
                    ? profileService.getImage(profile.avatarId)
                    : "/fallback.jpg"
                }
                alt={profile.username}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-xs text-white font-medium">Change</span>
              </div>
            </div>
          </label>

          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="text-xs text-[#999]"
            {...register("image")}
          />

          <textarea
            placeholder="Update your bio..."
            className="w-full bg-[#FAF9F6] border border-[#e0ddd8] text-[#111] text-sm p-2.5 rounded-lg focus:outline-none focus:border-[#0891B2] resize-none"
            rows={3}
            {...register("bio")}
          />

          <div className="flex gap-3 w-full">
            <button
              type="submit"
              className="flex-1 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsEdit(false)}
              className="flex-1 py-1.5 text-sm border border-[#ddd] text-[#666] rounded-lg hover:border-[#111] transition-colors bg-transparent"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {profile.avatarId ? (
            <img
              className="w-54 h-54 rounded-full object-cover border-2 border-[#0891B2]"
              src={profileService.getImage(profile.avatarId)}
              alt={profile.username}
            />
          ) : (
            <div className="w-54 h-54 rounded-full bg-[#0891B2] text-white text-3xl font-semibold flex items-center justify-center">
              {profile.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="mt-4 text-base font-semibold text-[#111]">
            {profile.username}
          </h2>
          <p className="mt-2 text-sm text-[#888] line-clamp-3">
            {profile.bio || "No bio added"}
          </p>
          {isAuthor && (
            <button
              className="mt-4 px-5 py-1.5 text-sm bg-[#111] text-white rounded-lg font-medium hover:bg-[#333] transition-colors cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCard;
