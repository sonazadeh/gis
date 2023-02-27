import React from 'react';
import Expand from '@arcgis/core/widgets/Expand';
import  { useEffect, useRef, useState } from "react";

import './Buttons.css';

const Buttons = ({ view }) => {
   const [showCreate,setShowCreate]= useState(false);
  const handleShowCreate = () =>{
    setShowCreate(!showCreate);
  }
  return (
    <div>
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

    
    </div>
  )
}

export default Buttons