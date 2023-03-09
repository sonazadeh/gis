import React from "react";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { useEffect, useRef, useState } from "react";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import Graphic from "@arcgis/core/Graphic.js";
import { AiFillDelete } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

import "./Draw.css";

function Draw({ view, buildingLayer, pointLayer, lineLayer, gLayer }) {
  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  var drawedLayer = new GraphicsLayer({
    visible: true,
  });
  var selectedFeture = null;
  var editFeature = null;

  const highlight = useRef(null);
  var willsendData = { status: false, type: "", feature: null };

  const polygonSymbol = {
    type: "simple-fill",
    color: [255, 0, 0, 0.5],
    outline: {
      color: [255, 255, 255],
      width: 2,
    },
  };

  const pointSymbol = {
    type: "simple-marker",
    color: "#ef5350", // marker color
    size: 10, // marker size
  };

  const lineSymbol = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "lightblue",
    width: "2px",
    style: "short-dot",
  };

  useEffect(() => {
    const sketchVM = new SketchViewModel({
      layer: gLayer,
      view: view,
    });

    const buildingBtn = document.getElementById("buildingBtn");
    const cutBtn = document.getElementById("cutBtn");
    const pointBtn = document.getElementById("pointBtn");
    const polylineBtn = document.getElementById("polylineBtn");

    buildingBtn.onclick = () => sketchVM.create("polygon");
    pointBtn.onclick = () => sketchVM.create("point");
    cutBtn.onclick = () => sketchVM.create("polyline");
    polylineBtn.onclick = () => sketchVM.create("polyline");

    const createButton = document.getElementById("create-button");
    const createDelete = document.getElementById("create-delete");
    const createDraw = document.getElementById("create-draw");

    createDraw.addEventListener("click", function () {
      debugger;
      if (willsendData.type === "polygon") {
        if (willsendData.status == false) {
          gLayer.removeAll();
          drawedLayer.removeAll();
          buildingLayer.applyEdits({ addFeatures: [willsendData.feature] });
          willsendData = { status: false, type: "", feature: null };
        }
      } else if (willsendData.type === "point") {
        if (willsendData.status == false) {
          gLayer.removeAll();
          drawedLayer.removeAll();
          pointLayer.applyEdits({ addFeatures: [willsendData.feature] });
          willsendData = { status: false, type: "", feature: null };
        }
      } else if (willsendData.type === "polyline") {
        if (willsendData.status == false) {
          gLayer.removeAll();
          drawedLayer.removeAll();
          lineLayer.applyEdits({ addFeatures: [willsendData.feature] });
          willsendData = { status: false, type: "", feature: null };
        }
      }

      console.log("created");

      // show the create button
      createButton.style.display = "block";
      // hide the delete button
      createDelete.style.display = "none";
    });

    sketchVM.on("create", (event) => {
      willsendData.type = event.tool;

      if (event.state === "active") {
        // Hide the create button
        createButton.style.display = "none";
        // Show the delete button
        createDelete.style.display = "flex";
      }

      if (event.state === "complete") {
        debugger;

        willsendData.status = false;
        willsendData.feature = event.graphic;

        var polygonGraphic = new Graphic({
          geometry: willsendData.feature.geometry,

          symbol: polygonSymbol,
        });
        drawedLayer.add(polygonGraphic);

        var pointGraphic = new Graphic({
          geometry: willsendData.feature.geometry,
          symbol: pointSymbol,
        });

        drawedLayer.add(pointGraphic);

        var polylineGraphic = new Graphic({
          geometry: willsendData.feature.geometry,
          geometry: "polyline",
          symbol: lineSymbol,
        });

        drawedLayer.add(polylineGraphic);

        view.map.add(drawedLayer);

        if (event.tool === "polyline" && selectedFeture !== null) {
          const geometrys = geometryEngine.cut(
            selectedFeture,
            event.graphic.geometry
          );

          buildingLayer
            .applyEdits({
              updateFeatures: [
                {
                  geometry: geometrys[0],
                  attributes: editFeature.attributes,
                },
              ],
            })
            .then(() => {
              buildingLayer.applyEdits({
                addFeatures: [new Graphic({ geometry: geometrys[1] })],
              });
            })
            .then(() => {
              console.log("Cut operation completed successfully");
            })
            .then(() => {
              gLayer.remove(event.graphic);
            })
            .catch((error) => {
              console.error("Error in cut operation", error);
            });
        }
      }
      // remove event listener after polygon is added to layer
      createDraw.removeEventListener("click", function () {});
    });

    // Cleanup function to remove event listeners and destroy sketchVM instance
    return () => {
      sketchVM.destroy();
      buildingBtn.onclick = null;
      pointBtn.onclick = null;
      cutBtn.onclick = null;
      polylineBtn.onclick = null;
    };
  }, []);

  return (
    <>
      <div className="top-menu">
        <div className="create">
          <button id="create-button" onClick={handleShowCreate}>
            Create
          </button>
          <div id="create-delete">
            <button id="create-draw">
              <BsSave />
            </button>
            <button id="delete-draw">
              <AiFillDelete />
            </button>
          </div>

          <div id="create-menu" className={showCreate ? "" : "hidden"}>
            <div className="button-title">What do you want to create?</div>
            <div id="button-container">
              <button
                className="action-button"
                id="buildingBtn"
                type="button"
                title="Bina"
              >
                <span>
                  <img className="button-img" src="img/home.png" />
                </span>

                <div className="icon-text">Bina</div>
              </button>

              <button
                className="action-button"
                id="buildingBtn"
                type="button"
                title="Bina"
              >
                <span>
                  <img className="button-img" src="img/floor.png" />
                </span>

                <div className="icon-text">Mərtəbə</div>
              </button>

              <button
                className="action-button"
                id="buildingBtn"
                type="button"
                title="Bina"
              >
                <span>
                  <img className="button-img" src="img/object.png" />
                </span>

                <div className="icon-text">Obyekt</div>
              </button>

              <button
                className="action-button"
                id="pointBtn"
                type="button"
                title="Adress"
              >
                <span>
                  <img className="button-img" src="img/location.png" />
                </span>

                <div className="icon-text">Giriş</div>
              </button>
              <button
                className="action-button"
                id="polylineBtn"
                type="button"
                title="Yol"
              >
                <span>
                  <img className="button-img" src="img/road.png" />
                </span>

                <div className="icon-text">Yol</div>
              </button>
              <button
                className="action-button"
                id="cutBtn"
                type="button"
                title="Kəs"
              >
                <span>
                  <img className="button-img" src="img/land.png" />
                </span>
                <div className="icon-text">Torpaq</div>
              </button>
            </div>
          </div>
        </div>
        <div className="comment">
          <button id="comment-button" className="esri-icon-comment"></button>
        </div>
        <div className="settings">
          <button id="settings-button" className="esri-icon-settings"></button>
        </div>
        <button id="profile-button" className="esri-icon-user"></button>
      </div>
    </>
  );
}
export default Draw;
