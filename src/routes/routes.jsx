import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import Dashboard from "../pages/Dashboard";
import HistoryPage from "../pages/History";
import HistoryDetail from "../pages/HistoryDetail";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes({ user }) {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected Routes */}
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetail />} />

          {/* Default authenticated redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          {/* If not logged in, redirect protected pages to landing */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/history" element={<Navigate to="/" replace />} />
          <Route path="/history/:id" element={<Navigate to="/" replace />} />

          {/* Default guest redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}
