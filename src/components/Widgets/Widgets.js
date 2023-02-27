import { useEffect, useRef } from "react";
import Home from "@arcgis/core/widgets/Home";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Measurement from "@arcgis/core/widgets/Measurement.js";

import "./Widgets.css";

const Widgets = ({ view }) => {
  const widgetRef = useRef(null);
  const layersMenuRef = useRef(null); // create a ref for the layersMenu container
  const measurementDivRef = useRef(null); // create a ref for the layersMenu container

  useEffect(() => {
    const home = new Home({
      view,
      container: widgetRef.current,
    });
    view.ui.add(home, "top-left");

    const search = new Search({
      view,
      container: widgetRef.current,
    });
    view.ui.add(search, {
      index: 1,
      position: "top-left",
    });

    const basemapGallery = new BasemapGallery({
      view,
      container: widgetRef.current,
    });

    const expand = new Expand({
      view: view,
      content: basemapGallery,
      expandIconClass: "esri-icon-basemap",
      group: "top-right",
    });

    view.ui.add(expand, "bottom-left");

    const expandLayers = new Expand({
      view: view,
      content: layersMenuRef.current, // pass the ref to the layersMenu container
      expandIconClass: "esri-icon-layers",
      group: "top-right",
    });

    view.ui.add(expandLayers, "bottom-left");

    const measurement = new Measurement({
      view: view,
    });

    const measurementExpand = new Expand({
      expandIconClass: "esri-icon-measure",
      view: view,
      content: measurementDivRef.current,
    });
    view.ui.add(measurementExpand, "bottom-left");

    return () => {
      home.destroy();
      search.destroy();
      basemapGallery.destroy();
      expand.destroy();
      expandLayers.destroy();
      measurementExpand.destroy();
    };
  }, [view]);

  return (
    <>
      <div id="layersMenu" ref={layersMenuRef}>
        {" "}
        {/* assign the ref to the container */}
        <div id="layers-container">
          <ul className="layers-list">
            <li className="layers-item" id="polygon">
              <span>
                {" "}
                <img className="layers-img" src="img/home.svg" />{" "}
              </span>
              Polygon
            </li>
            <li className="layers-item" id="point">
              <span>
                {" "}
                <img className="layers-img" src="img/location.svg" />{" "}
              </span>
              Point
            </li>
            <li className="layers-item" id="polyline">
              <span>
                {" "}
                <img className="layers-img" src="img/road.svg" />{" "}
              </span>
              Polyline
            </li>
          </ul>
        </div>
      </div>

      <div
        id="measurementDiv"
        ref={measurementDivRef}
        class="esri-component esri-widget"
      >
        <button
          id="distance"
          className="esri-widget--button esri-interactive esri-icon-measure-line"
          title="Distance Measurement Tool"
        ></button>
        <button
          id="area"
          className="esri-widget--button esri-interactive esri-icon-measure-area"
          title="Area Measurement Tool"
        ></button>
        <button
          id="clear"
          className="esri-widget--button esri-interactive esri-icon-trash"
          title="Clear Measurements"
        ></button>
      </div>
    </>
  );
};

export default Widgets;
