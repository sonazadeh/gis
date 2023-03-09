import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import WMSLayer from "@arcgis/core/layers/WMSLayer.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import './Layers.css';
import { Link } from "react-router-dom";



const WMSLayers= () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);
  
  
 
  useEffect(() => {


    const wms = new WMSLayer({
      url: "https://ows.terrestris.de/osm/service",
      sublayers: [
        {
          name: "OSM-WMS"
        }
      ]
    });
  
    const map = new Map({
      basemap: {
        baseLayers: [wms]
      }
    });
  
    
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
          id="viewDiv"
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
        </div>
      </div>
      <div className="back-div">
        <Link to='/'>
           <button type="button" className="back-btn">Back</button>
        </Link>
      </div>
    </>
  );
};

export default WMSLayers;
