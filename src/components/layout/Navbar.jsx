import { signOut } from "firebase/auth";
import { History, LogOut, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import { getUserProfile } from "../../services/saveResumeAnalysis";
import ProfilePopup from "../profile/ProfilePopup";

export default function Navbar() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [userData, setUserData] = useState(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const loadUser = async () => {
      const data = await getUserProfile(uid);
      setUserData(data);
    };

    loadUser();
  }, []);

  // Close dropdown clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleHistory = () => {
    navigate("/history");
    setProfileOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">
              Resume ATS
            </span>
          </div>

          {/* Profile Dropdown */}
          {userData && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  src={userData.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-slate-200"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={userData.photoURL || "/placeholder.svg"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {userData.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {auth.currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        setPopOpen(true);
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={handleHistory}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <History className="w-4 h-4" />
                      <span>History</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-200 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {popOpen && (
        <ProfilePopup
          userId={auth.currentUser.uid}
          onClose={() => setPopOpen(false)}
        />
      )}
    </nav>
  );
}
