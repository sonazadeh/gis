import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Widgets from "../Widgets";

import "./Maps.css";

const Maps = () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (effectRun.current === false) {
      const map = new Map({
        basemap: "gray-vector",
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 18,
        center: [-77.60688884872243, 43.1585128643808],
      });

      view.when((view) => {
        setView(view);
      });

      const gLayer = new GraphicsLayer({
        visible: true,
      });

      map.add(gLayer);
      effectRun.current = true;
    }
  }, []);

  return (
    <>
      <div className="map-container">
        <Navbar />
        <div
          className="map-wrapper"
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {view && <Widgets view={view} />}
        </div>
      </div>
    </>
  );
};

export default Maps;
