import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer.js";
import MapView from "@arcgis/core/views/MapView";
import './Layers.css';
import Basemap from "@arcgis/core/Basemap.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import { Link } from "react-router-dom";


const WMTSLayers= () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);
  
  
 
  useEffect(() => {

    
    if (effectRun.current === false) {
      

      const plainIGNBasemap = new Basemap({
        baseLayers: [
          new WMTSLayer({
            url: "https://www.ign.es/wmts/ign-base",
            activeLayer: {
              id: "IGNBase-gris",
              tileMatrixSetId: "GoogleMapsCompatible"
            },
            serviceMode: "KVP",
            copyright: `<a href="https://www.ign.es/" target="_blank">Instituto Geográfico Nacional</a>`
          })
        ],
        thumbnailUrl:
          "https://www.ign.es/wmts/ign-base?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=IGNBase-gris&STYLE=default&FORMAT=image%2Fjpeg&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX=6&TILEROW=24&TILECOL=31"
      });

      const orthoIGNBasemap = new Basemap({
        baseLayers: [
          new WMTSLayer({
            url: "https://www.ign.es/wmts/mapa-raster",
            activeLayer: {
              id: "MTN",
              tileMatrixSetId: "GoogleMapsCompatible"
            },
            serviceMode: "KVP",
            copyright: `<a href="https://www.ign.es/" target="_blank">Instituto Geográfico Nacional</a>`
          })
        ],
        thumbnailUrl:
          "https://www.ign.es/wmts/mapa-raster?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=MTN&STYLE=default&FORMAT=image%2Fjpeg&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX=6&TILEROW=24&TILECOL=31"
      });

      const map = new Map({
        basemap: plainIGNBasemap
      });

      const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-3.7038, 40.4168],
        scale: 4622333.6783341225,
        constraints: {
          maxScale: 564.2497165935213
        }
      });

      view.ui.add(
        new BasemapToggle({
          view,
          nextBasemap: orthoIGNBasemap
        }),
        "bottom-right"
      );
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

export default WMTSLayers;
