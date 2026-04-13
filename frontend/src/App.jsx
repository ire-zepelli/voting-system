import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/voting" element={<Voting />} />
      </Routes>
    </>
  );
}

export default App;
