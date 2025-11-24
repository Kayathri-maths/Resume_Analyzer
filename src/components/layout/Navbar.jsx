import { signOut } from "firebase/auth";
import { LogOut, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { auth } from "../../firebase";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-slate-200"
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <img
                src={user.photoURL || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-slate-200"
              />
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && user && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="px-4 py-3 bg-slate-50 rounded-lg mb-4">
              <p className="text-sm font-medium text-slate-900">
                {user.displayName || user.email}
              </p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
