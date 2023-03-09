import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
import SceneView from "@arcgis/core/views/SceneView.js";




const VectorTileLayers= () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);
  
  const VTL = new VectorTileLayer({
    url: "https://ows.terrestris.de/osm/service",
    sublayers: [
      {
        name: "OSM-WMS"
      }
    ]
  });

  const map = new Map({
    basemap: {
      baseLayers: [VTL]
    }
  });

 
  useEffect(() => {

    
    if (effectRun.current === false) {
      

      const view = new SceneView({
        container: "viewDiv",
        map: map,
        spatialReference: {
          wkid: 102100
        }
      });

      view.when((view) => {
        setView(view);
      });

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
        
          {view}
         
        </div>
      </div>
    </>
  );
};

export default VectorTileLayers;
