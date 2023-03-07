import { useEffect, useRef, useState } from "react";
import Home from "@arcgis/core/widgets/Home";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Measurement from "@arcgis/core/widgets/Measurement.js";



import "./Widgets.css";

const Widgets = ({view ,buildingLayer,pointLayer,lineLayer}) => {

  
  var layer_visiblty = localStorage.getItem('layer_visiblty');
  var sample = {
    showPolygon:false,
    showPolyline:false,
    showPoint:false
  };
  if(layer_visiblty==null){
    localStorage.setItem('layer_visiblty',JSON.stringify(sample));
  }else{
    sample=JSON.parse(layer_visiblty);
  }

  const widgetRef = useRef(null);
  const layersMenuRef = useRef(null); // create a ref for the layersMenu container
  const measurementDivRef = useRef(null); // create a ref for the layersMenu container

  const [showPolygon, setShowPolygon] = useState(sample.showPolygon);
  const [showPolyline, setShowPolyline] = useState(sample.showPolyline);
  const [showPoint, setShowPoint] = useState(sample.showPoint);
  var moment1 = true;

  const showHidePolygon = (layerName,status)=>{
    debugger;
    switch(layerName){
      case 'polygon':{
        setShowPolygon(status);
        if (status) {
          view.map.add(buildingLayer);
          sample.showPolygon = true;
        } else {
          view.map.remove(buildingLayer);
          sample.showPolygon = false;
        }
        break;
      }
    }
    localStorage.setItem('layer_visiblty', JSON.stringify(sample));
  }

  const showHidePoint = (layerName,status)=>{
    debugger;
    switch(layerName){
      case 'point':{
        setShowPoint(status);
        if (status) {
          view.map.add(pointLayer);
          sample.showPoint = true;
        } else {
          view.map.remove(pointLayer);
          sample.showPoint = false;
        }
        break;
      }
    }
    localStorage.setItem('layer_visiblty', JSON.stringify(sample));
  }


  const showHidePolyline = (layerName,status)=>{
    debugger;
    switch(layerName){
      case 'polyline':{
        setShowPolyline(status);
        if (status) {
          view.map.add(lineLayer);
          sample.showPolyline = true;
        } else {
          view.map.remove(lineLayer);
          sample.showPolyline = false;
        }
        break;
      }
    }
    localStorage.setItem('layer_visiblty', JSON.stringify(sample));
  }


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

    view.ui.add(measurement, "bottom-right");

    const measurementExpand = new Expand({
      expandIconClass: "esri-icon-measure",
      view: view,
      content: measurementDivRef.current,
    });
    view.ui.add(measurementExpand, "bottom-left");

    const distanceButton = document.getElementById("distance");
    const areaButton = document.getElementById("area");
    const clearButton = document.getElementById("clear");

    if (distanceButton && areaButton && clearButton) {
      distanceButton.addEventListener("click", () => {
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
        clearMeasurements();
      });
    }

    // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
    function distanceMeasurement() {
      measurement.activeTool = "distance";
      distanceButton.classList.add("active");
      areaButton.classList.remove("active");
    }

    // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
    function areaMeasurement() {
      measurement.activeTool = "area";
      distanceButton.classList.remove("active");
      areaButton.classList.add("active");
    }

    // Clears all measurements
    function clearMeasurements() {
      distanceButton.classList.remove("active");
      areaButton.classList.remove("active");
      measurement.clear();
    }

    debugger;
    if(moment1){
      if(sample.showPolyline){
        showHidePolyline('polyline',true);
      }

      if(sample.showPolygon){
        showHidePolygon('polygon',true);
      }
      if(sample.showPoint){
        showHidePoint('point',true);
      }
      moment1 = false;
    }
    

    return () => {
      home.destroy();
      search.destroy();
      basemapGallery.destroy();
      expand.destroy();
      expandLayers.destroy();
      measurementExpand.destroy();
      measurement.destroy();
      distanceButton.removeEventListener("click", distanceMeasurement);
      areaButton.removeEventListener("click", areaMeasurement);
      clearButton.removeEventListener("click", clearMeasurements);
    };
  }, [view]);

 
  debugger
  return (
    <>
      <div id="layersMenu" ref={layersMenuRef}>
        {" "}
        {/* assign the ref to the container */}
        <div id="layers-container">
          <ul className="layers-list">
          
            <li
              className={showPolygon ? "layers-item active" : "layers-item"}
              onClick={() => showHidePolygon('polygon',!sample.showPolygon)} 
              id="polygon"
            >
              <span>
                {" "}
                <img className="layers-img" src="img/home.svg" />{" "}
              </span>
              Polygon
            </li>
            <li className={showPoint ? "layers-item active" : "layers-item"}
              onClick={() => showHidePoint('point',!sample.showPoint)}  id="point">
              <span>
                {" "}
                <img className="layers-img" src="img/location.svg" />{" "}
              </span>
              Point
            </li>
            <li className={showPolyline ? "layers-item active" : "layers-item"}
              onClick={() => showHidePolyline('polyline',!sample.showPolyline)} id="polyline">
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
        className="esri-component esri-widget"
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
