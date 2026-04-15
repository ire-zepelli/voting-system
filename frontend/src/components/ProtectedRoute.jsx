import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#34102A] text-white flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-2xl font-semibold tracking-tight">Checking session...</p>
          <p className="text-white/70 mt-3">Please wait while your voting access is verified.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/not-signed-in" replace />;
  }

  return children;
}