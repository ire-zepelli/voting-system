import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
import CandidatePoster from "./pages/CandidatePoster";
import { PartyList } from "./pages/PartyList";
import PartyListDetail from "./pages/PartyListDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/partylist" element={<PartyList />} />
        <Route path="/partylist/:id" element={<PartyListDetail />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/candidate-poster" element={<CandidatePoster />} />
      </Routes>
    </>
  );
}

export default App;
