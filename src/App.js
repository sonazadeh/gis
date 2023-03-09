import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Maps from "./components/Maps/Maps";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WMSLayers from "./components/Layers/WMSLayers";
import WMTSLayers from "./components/Layers/WMTSLayers";
import VectorTileLayers from "./components/Layers/VectorTileLayers";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/" element={<Maps />} />
        <Route exact="true" path="/navbar" element={<Navbar />} />
        <Route exact="true" path="/login" element={<Login />} />
        <Route exact="true" path="/wms" element={<WMSLayers />} />
        <Route exact="true" path="/wmts" element={<WMTSLayers />} />
        <Route exact="true" path="/vectorTileLayer" element={<VectorTileLayers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
