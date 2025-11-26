import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import Dashboard from "../pages/Dashboard";
import HistoryPage from "../pages/History";
import HistoryDetail from "../pages/HistoryDetail";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes({ user }) {
  const protect = (element) => (user ? element : <Navigate to="/" replace />);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      <Route path="/dashboard" element={protect(<Dashboard />)} />
      <Route path="/history" element={protect(<HistoryPage />)} />
      <Route path="/history/:id" element={protect(<HistoryDetail />)} />

      <Route
        path="*"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}
