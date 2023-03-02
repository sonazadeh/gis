import React from 'react';
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Expand from '@arcgis/core/widgets/Expand';
import  { useEffect, useRef, useState } from "react";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import Graphic from "@arcgis/core/Graphic.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";



import './Draw.css';

function Draw({view ,buildingLayer,pointLayer,lineLayer,gLayer}) {
    const [showCreate,setShowCreate]= useState(false);
    const handleShowCreate = () =>{
      setShowCreate(!showCreate);
    }
    var selectedFeture = null;
    let editFeature = null;
   
    const highlight = useRef(null);

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

      if (event.state === "complete") {
       
        if (event.tool === "polygon") {
          gLayer.remove(event.graphic);
          buildingLayer.applyEdits({ addFeatures: [event.graphic] });
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
        }}

      
    });

    buildingBtn.onclick = () => sketchVM.create("polygon");
    pointBtn.onclick = () => sketchVM.create("point");
    cutBtn.onclick = () => sketchVM.create("polyline");
    polylineBtn.onclick = () => sketchVM.create("polyline");


    view.on("click", (event) => {

      // check if click has features underneath
      view.hitTest(event).then((hitTest) => {
        const [first] = hitTest.results;

        if (first) {
          selectFeature(
            first.graphic.attributes[buildingLayer.objectIdField],
            first.graphic.geometry
          );
          return;
        }

        // updateContainer.classList.add("esri-hidden");
      });
    });


    function selectFeature(objectId, geom) {
      buildingLayer
        .queryFeatures({
          objectIds: [objectId],
          outFields: ["*"],
        })
        .then(({ features }) => {
          if (features.length === 0) {
            return;
          }

          [editFeature] = features;
          selectedFeture = geom;

          
          // highlight selected feature
          view.whenLayerView(editFeature.layer).then((layerView) => {
              highlight.current = layerView.highlight(editFeature);

          });
         
        });
    }

    function unselectFeature() {
      if (highlight.current) {
        highlight.current.remove();
        highlight.current = null;
      }
    }
    
    // Cleanup function to remove event listeners and destroy sketchVM instance
    return () => {
      sketchVM.destroy();
      buildingBtn.onclick = null;
      pointBtn.onclick = null;
      cutBtn.onclick = null;
      polylineBtn.onclick = null;
    };
  }, []);

  return <>
  <div className="top-menu">
 <div className="create ">
   <button id="create-button" onClick={handleShowCreate}>Create</button>
   <div id="create-menu" className={showCreate ? "" :'hidden'}>
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
       <button className="action-button" id="cutBtn" type="button" title="Kəs">
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


}
export default Draw;
