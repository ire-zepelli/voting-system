import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
const PartyList = lazy(() => import("./pages/PartyList").then(m => ({ default: m.PartyList })));
const PartyListDetail = lazy(() => import("./pages/PartyListDetail"));
import Results from "./pages/Results";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

const MobileWarning = () => (
  <div className="fixed inset-0 bg-[#34102A] flex flex-col items-center justify-center p-8 text-center z-[9999]">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff9500] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d13a8b] blur-[120px] rounded-full" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-8 max-w-md animate-in fade-in zoom-in duration-700">
      {/* Icon/Logo */}
      <div className="w-24 h-24 rounded-3xl bg-white/5 border-2 border-white/10 flex items-center justify-center shadow-2xl scale-110 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#ff9500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase leading-none italic">
          Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9500] to-[#ffb74d]">Restricted</span>
        </h1>
        <p className="text-lg text-white/60 font-medium tracking-tight px-4 leading-relaxed">
          The voting system is optimized for laboratory workstation performance and security.
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl w-full translate-y-4">
        <p className="text-sm font-bold text-[#ff9500] uppercase tracking-[0.2em] mb-2">Notice</p>
        <p className="text-2xl font-black text-white uppercase tracking-tight italic">
          Proceed to C1 Laboratory
        </p>
      </div>

      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-75" />
        <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse delay-150" />
      </div>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#34102A' }}>
          <div style={{ color: '#fff', fontFamily: 'Inter' }}>Loading...</div>
        </div>
      }>
        <div key={location.pathname} className="page-transition min-h-screen">
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/partylist" element={<PartyList />} />
            <Route path="/partylist/:id" element={<PartyListDetail />} />
            <Route
              path="/voting"
              element={
                <ProtectedRoute>
                  <Voting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Navigate to="/login" replace />} />
            <Route path="/login/not-signed-in" element={<Login />} />
            <Route path="/login/timerexpired" element={<Login />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
