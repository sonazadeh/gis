import React from "react";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { useEffect, useRef, useState } from "react";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import Graphic from "@arcgis/core/Graphic.js";
import { AiFillDelete } from "react-icons/ai";
import { BsSave } from "react-icons/bs";

import "./Draw.css";

function Draw({ view, buildingLayer, pointLayer, lineLayer, gLayer }) {
  const [showCreate, setShowCreate] = useState(false);
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };
  var selectedFeture = null;
  let editFeature = null;

  const highlight = useRef(null);
  var willsendData = { status: false, feature: null };

  const createDraw = () => {
    if (willsendData.status == false) {
      buildingLayer.applyEdits({ addFeatures: [willsendData.feature] });
      willsendData = { status: false, feature: null };
    }
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

    sketchVM.on("create", (event) => {
      const createButton = document.getElementById("create-button");
      const createDelete = document.getElementById("create-delete");
      const createMenu = document.getElementById("create-menu");

      if (event.state === "active") {
        // Hide the create button
        createButton.style.display = "none";
        // Show the delete button
        createDelete.style.display = "flex";
        // Hide the create button
        createMenu.style.display = "none";
      }

      if (event.state === "complete") {
        if (event.tool === "polygon") {
          willsendData.feature = event.graphic;
        }

        if (event.tool === "point") {
          gLayer.remove(event.graphic);
          pointLayer.applyEdits({ addFeatures: [event.graphic] });
        }

        if (event.tool === "polyline" && selectedFeture === null) {
          gLayer.remove(event.graphic);
          lineLayer.applyEdits({ addFeatures: [event.graphic] });
        }
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
    });

    buildingBtn.onclick = () => sketchVM.create("polygon");
    pointBtn.onclick = () => sketchVM.create("point");
    cutBtn.onclick = () => sketchVM.create("polyline");
    polylineBtn.onclick = () => sketchVM.create("polyline");

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
        <div className="create ">
          <button id="create-button" onClick={handleShowCreate}>
            Create
          </button>
          <div id="create-delete">
            <button id="create-draw" onClick={createDraw}>
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
                  <img className="button-img" src="img/home.svg" />
                </span>

                <div className="icon-text">Building</div>
              </button>
              <button
                className="action-button"
                id="pointBtn"
                type="button"
                title="Adress"
              >
                <span>
                  <img className="button-img" src="img/location.svg" />
                </span>

                <div className="icon-text">Loaction</div>
              </button>
              <button
                className="action-button"
                id="polylineBtn"
                type="button"
                title="Yol"
              >
                <span>
                  <img className="button-img" src="img/road.svg" />
                </span>

                <div className="icon-text">Road</div>
              </button>
              <button
                className="action-button"
                id="cutBtn"
                type="button"
                title="Kəs"
              >
                <span>
                  <img className="button-img" src="img/cut.svg" />
                </span>
                <div className="icon-text">Cut</div>
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
