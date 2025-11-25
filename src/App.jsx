import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import "./App.css";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { auth } from "./firebase";

import AppRoutes from "./routes/routes";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Navbar user={user} />

      {/* Main App Routes */}
      <div className="flex-grow">
        <AppRoutes user={user} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
