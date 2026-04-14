import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
import CandidatePoster from "./pages/CandidatePoster";
import { PartyList } from "./pages/PartyList";
import PartyListDetail from "./pages/PartyListDetail";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/partylist" element={<PartyList />} />
        <Route path="/partylist/:id" element={<PartyListDetail />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/candidate-poster" element={<CandidatePoster />} />
        <Route path="/results" element={<Results />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Temporary routes for now since there is no backend yet */}
        <Route path="/login/not-signed-in" element={<Login />} />
        <Route path="/login/timerexpired" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
