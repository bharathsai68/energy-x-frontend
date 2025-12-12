import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SingleMeter from "./pages/SingleMeter";
import Pcc1 from "./pages/Pcc1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pcc1" element={<Pcc1 />} />
      <Route path="/SingleMeter/:id" element={<SingleMeter />} />
    </Routes>
  );
}

export default App;
