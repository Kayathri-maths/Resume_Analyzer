import { signOut } from "firebase/auth";
import { History, LogOut, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import ProfilePopup from "../profile/ProfilePopup";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
    navigate("/history"); // or your routing logic
    setProfileOpen(false);
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">
              Resume ATS
            </span>
          </div>

          {/* Profile Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-slate-200 cursor-pointer hover:border-blue-500 transition-colors"
                />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || "/placeholder.svg"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setPopOpen(true);
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={handleHistory}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <History className="w-4 h-4" />
                      <span>History</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-slate-200 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
        <ProfilePopup user={user} onClose={() => setPopOpen(false)} />
      )}
    </nav>
  );
}
