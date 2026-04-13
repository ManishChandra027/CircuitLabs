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

  const { register, handleSubmit, reset } = useForm({ defaultValues: { bio: "", avatarId: "" } });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!slug) return;
        const data = await profileService.getProfiles([Query.equal("userId", slug)]);
        if (!data || data.documents.length === 0) throw new Error("No profile found");
        setProfile(data.documents[0]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchProfile();
  }, [slug]);

  useEffect(() => {
    if (profile?.$id) reset({ bio: profile.bio || "", avatarId: profile.avatarId || "" });
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

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
      <p className="text-sm text-red-400">{error}</p>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
      <div className="w-8 h-8 border-2 border-[#2a2a2a] border-t-[#06B6D4] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-xs w-full mx-auto mt-2 p-4  rounded-xl flex flex-col items-center text-center">
      {isEdit ? (
        <form onSubmit={handleSubmit(handleUpdate)} className="w-full flex flex-col items-center gap-3">
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <div className="relative w-54 h-54 rounded-full overflow-hidden border-2 border-[#06B6D4]">
              <img
                className="w-full h-full object-cover"
                src={profile.avatarId ? profileService.getImage(profile.avatarId) : "/fallback.jpg"}
                alt={profile.username}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-xs text-white">Change</span>
              </div>
            </div>
          </label>

          <input id="avatarUpload" type="file" className="text-xs text-gray-400" {...register("image")} />

          <textarea
            placeholder="Update your bio..."
            className="w-full bg-[#1e1e1e] border border-[#2a2a2a] text-white text-sm p-2 rounded-lg focus:outline-none focus:border-[#06B6D4] resize-none"
            rows={3}
            {...register("bio")}
          />

          <div className="flex gap-3 w-full">
            <button
              type="submit"
              className="flex-1 py-1.5 text-sm bg-[#06B6D4] text-black rounded-lg font-medium hover:bg-[#0891B2] transition-colors"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsEdit(false)}
              className="flex-1 py-1.5 text-sm border border-[#2a2a2a] text-gray-400 rounded-lg hover:border-[#06B6D4] hover:text-[#06B6D4] transition-colors"
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
            <div className="w-54 h-54 rounded-full bg-[#0891B2] text-black text-6xl font-medium flex items-center justify-center border-2 border-[#06B6D4]">
              {profile.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-4 text-base font-medium text-white">{profile.username}</h2>
          <p className="mt-2 text-sm text-[#666] line-clamp-3">{profile.bio || "No bio added"}</p>

          {isAuthor && (
            <button
              className="mt-4 px-5 py-1.5 text-sm bg-[#06B6D4] text-black rounded-lg font-medium hover:bg-[#0891B2] transition-colors"
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