import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
import CandidatePoster from "./pages/CandidatePoster";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/candidate-poster" element={<CandidatePoster />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
