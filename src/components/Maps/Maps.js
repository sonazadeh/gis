import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Widgets from "../Widgets/Widgets";
import Draw from "../Draw/Draw";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Color from "@arcgis/core/Color";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";

import "./Maps.css";

const Maps = () => {
  const mapRef = useRef(null);
  const effectRun = useRef(false);
  const [view, setView] = useState(null);

  const gLayer = new GraphicsLayer({
    visible: true,
  });

  const map = new Map({
    basemap: "hybrid",
    layers: [gLayer],
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
    }
  }, []);

  const typeField = {
    name: "type",
    alias: "Type",
    type: "string",
  };

  const buildingLayer = new FeatureLayer({
    url: "https://servicesdev1.arcgis.com/5uh3wwYLNzBuU0Eu/arcgis/rest/services/DevSummit_Polygons_Layer/FeatureServer/0",
    outFields: ["*"],
    spatialReference: "3857",
    objectIdField: "OBJECTID",
    geometryType: "polygon",
    outSpatialReference: { wkid: 3857 },
    returnGeometry: true,
    fields: [typeField],
  });

  const lineLayer = new FeatureLayer({
    url: "https://servicesdev1.arcgis.com/5uh3wwYLNzBuU0Eu/ArcGIS/rest/services/DevSummitTestLayers/FeatureServer/1",
    outFields: ["*"],
    spatialReference: "3857",
    objectIdField: "OBJECTID",
    geometryType: "polyline",
    outSpatialReference: { wkid: 3857 },
    returnGeometry: true,
  });

  const pointLayer = new FeatureLayer({
    url: "https://servicesdev1.arcgis.com/5uh3wwYLNzBuU0Eu/ArcGIS/rest/services/DevSummitTestLayers/FeatureServer/0",
    outFields: ["*"],
    spatialReference: "3857",
    objectIdField: "OBJECTID",
    geometryType: "point",
    outSpatialReference: { wkid: 3857 },
    returnGeometry: true,
  });

  return (
    <>
      <div className="map-container">
        <div
          className="map-wrapper"
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {view && (
            <Widgets
              view={view}
              buildingLayer={buildingLayer}
              lineLayer={lineLayer}
              pointLayer={pointLayer}
            />
          )}
          {view && (
            <Draw
              view={view}
              buildingLayer={buildingLayer}
              lineLayer={lineLayer}
              pointLayer={pointLayer}
              gLayer={gLayer}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Maps;
