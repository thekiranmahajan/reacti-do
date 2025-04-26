import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, Mail, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { formatDateTime } from "../lib/utils";

const ProfilePage = () => {
  const { authUser, isProfileUpdating, profileUpdate } = useAuthStore();
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  const handleProfileUpdate = (e) => {
    const image = e.target.files[0];
    if (!image) {
      toast.error("No image is selected");
      return;
    }

    if (image.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB");
      return;
    }
    if (!image.type.startsWith("image/")) {
      toast.error("File is not an image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedProfilePic(base64Image);
      await profileUpdate({ profilePic: base64Image });
    };
  };
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl p-4 py-8">
        <div className="bg-base-300 relative space-y-8 rounded-xl p-6">
          <Link to="/">
            <X className="absolute top-5 right-5 opacity-80 hover:opacity-100 md:size-7" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Profile Picture  */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedProfilePic || authUser.profilePic}
                alt="Profile Picture"
                className="size-32 rounded-full border-4 object-cover"
              />
              <label
                htmlFor="profile-picture-upload"
                className={`bg-base-content absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-all duration-200 hover:scale-105 ${isProfileUpdating ? "pointer-events-none animate-pulse" : ""}`}
              >
                <Camera className="text-base-200 size-5" />
                <input
                  type="file"
                  id="profile-picture-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileUpdate}
                  disabled={isProfileUpdating}
                />
              </label>
            </div>
            <p className="text-center">
              {isProfileUpdating
                ? "Uploading.."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="size-5" />
                Full Name
              </div>
              <p className="bg-base-200 rounded-lg border px-4 py-2.5">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="size-5" />
                Email
              </div>
              <p className="bg-base-200 rounded-lg border px-4 py-2.5">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-base-300 mt-6 rounded-xl p-6">
            <h2 className="mb-4 text-lg font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-700 pt-2">
                <span>Member Since</span>
                <span>{formatDateTime(authUser?.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
