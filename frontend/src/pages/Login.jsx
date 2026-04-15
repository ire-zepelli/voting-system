import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import uclmccs from "../assets/uclmccs.png";
import uclmpsits from "../assets/uclmpsits.png";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = location.pathname;

  const isNotSignedIn = path === '/login/not-signed-in';
  const isTimerExpired = path === '/login/timerexpired' || path === '/timer-expired';
  const isLogin = !isNotSignedIn && !isTimerExpired;

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
    setIsSubmitting(true);

    try {
      const nextUser = await login({
        studentId: formData.studentId,
        password: formData.password,
      });

      navigate(nextUser.hasVoted ? "/results" : "/voting", { replace: true });
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

          {isLogin && (
            <>
              <h1 className="text-[46px] font-bold text-white mb-6 tracking-tight">Login</h1>
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <p className="text-xs text-white/65 mb-6 mt-1">
                  Your session stays active on this browser until you log out.
                </p>

                {errorMessage && (
                  <div className="mb-5 rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {errorMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || formData.studentId.length !== 8 || !formData.password}
                >
                  {isSubmitting ? "Signing In..." : "Login"}
                </Button>
                
                <div className="mt-8 text-center text-sm text-white/80">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-[#FFA700] hover:text-[#E58000] hover:underline transition-colors font-medium">
                    Register
                  </Link>
                </div>
              </form>
            </>
          )}

          {isNotSignedIn && (
            <>
              <h1 className="text-[44px] font-bold text-white mb-2 tracking-tight mt-1">Oops!</h1>
              <h2 className="text-[44px] font-bold text-white mb-12 tracking-tight leading-8">Please sign in to continue.</h2>
              <Button onClick={() => navigate('/login')}>Redirect to Login</Button>
            </>
          )}

          {isTimerExpired && (
            <>
              <h1 className="text-[44px] font-bold text-white mb-8 tracking-tight leading-[1.1] mt-6">The election has officially <br /> ended.</h1>
              <Button onClick={() => navigate('/')}>Back to Homepage</Button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
