import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import uclmccs from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";
import { useAuth } from "../context/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, register, user } = useAuth();
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to={user?.hasVoted ? "/results" : "/voting"} replace />;
  }

  function handleChange(event) {
    const { id, value } = event.target;

    setErrorMessage("");
    setFormData((current) => ({
      ...current,
      [id]: id === "studentId" ? value.replace(/\D/g, "").slice(0, 8) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (formData.studentId.length !== 8) {
      setErrorMessage("Student ID must be exactly 8 digits.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        studentId: formData.studentId,
        password: formData.password,
      });

      navigate("/voting", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-inter" style={{ backgroundColor: '#34102A' }}>
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[550px] fade-in-up">
          <div className="flex gap-1 mb-1 items-center justify-start ml-1">
            <img src={uclmccs} alt="UCLM CCS Logo" className="w-[45px] h-auto object-contain" />
            <img src={uclmpsits} alt="UCLM PSITS Logo" className="w-[45px] h-auto object-contain" />
          </div>

          <h1 className="text-[46px] font-bold text-white mb-6 tracking-tight">Register</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="ID Number"
              id="studentId"
              type="text"
              inputMode="numeric"
              maxLength={8}
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your 8-digit student ID"
              autoComplete="username"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            {errorMessage && (
              <div className="mb-5 rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {errorMessage}
              </div>
            )}
            
            <div className="mt-8">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Register"}
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FFA700] hover:text-[#E58000] hover:underline transition-colors font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
