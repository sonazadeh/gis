import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Widgets from "../Widgets/Widgets";
import Buttons from "../Buttons/Buttons";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";



import "./Maps.css";

const Maps = () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);
  
  const map = new Map({
    basemap: "hybrid",
  });

  useEffect(() => {

    
    if (effectRun.current === false) {
      

      const view = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 17,
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
        <div
          className="map-wrapper"
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {view && <Widgets view={view} />}
          {view && <Buttons view={view} />}
        </div>
      </div>
    </>
  );
};

export default Maps;
