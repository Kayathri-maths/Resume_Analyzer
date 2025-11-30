import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  getUserProfile,
  saveUserProfile,
} from "../../services/saveResumeAnalysis";

export default function ProfilePopup({ onClose }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const uid = auth.currentUser.uid;
        const userData = await getUserProfile(uid);

        if (userData) {
          setName(userData.name || "");
          setPhotoURL(userData.photoURL || "");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    try {
      const uid = auth.currentUser.uid;

      await saveUserProfile(uid, {
        name,
        photoFile: photo,
      });

      alert("Profile updated!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white text-lg">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl w-96 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Profile</h2>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={
              photo
                ? URL.createObjectURL(photo)
                : photoURL || "/default-avatar.png"
            }
            alt="Profile Preview"
            className="h-20 w-20 rounded-full object-cover border"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Name</label>
          <input
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-1"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
