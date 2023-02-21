import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Maps from "./components/Maps/Maps";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/" element={<Maps />} />
        <Route exact="true" path="/navbar" element={<Navbar />} />
        <Route exact="true" path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
