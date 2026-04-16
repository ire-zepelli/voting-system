import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
const PartyList = lazy(() => import("./pages/PartyList").then(m => ({ default: m.PartyList })));
const PartyListDetail = lazy(() => import("./pages/PartyListDetail"));
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#34102A' }}>
          <div style={{ color: '#fff', fontFamily: 'Inter' }}>Loading...</div>
        </div>
      }>
        <Routes>
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
          <Route path="/results" element={<Results />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/not-signed-in" element={<Login />} />
          <Route path="/login/timerexpired" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
