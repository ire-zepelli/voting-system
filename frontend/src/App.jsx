import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Voting from "./pages/Voting";
import { PartyList } from "./pages/PartyList";
import PartyListDetail from "./pages/PartyListDetail";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
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
    </>
  );
}

export default App;
