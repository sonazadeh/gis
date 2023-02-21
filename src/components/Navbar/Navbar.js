import React from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { BiMapAlt, BiPieChartAlt2, BiShow } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { TbDoorExit } from "react-icons/tb";

import { useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (event) => {
    setActiveLink(event.target.id);
  };
  return (
    <div>
      <nav id="navbar">
        <div className="navbar-wrapper">
          <ul id="menu">
            <NavLink
              to="/"
              exact
              activeclassname="active"
              className="nav_link "
            >
              <li
                id="map"
                onClick={handleLinkClick}
                className={activeLink === "map" ? "active" : "active"}
              >
                <BiMapAlt style={{ width: "20px", height: "20px" }} />
              </li>
            </NavLink>

            <NavLink
              to="/chart"
              exact
              activeclassname="active"
              className="nav_link"
            >
              <li
                id="chart"
                onClick={handleLinkClick}
                className={activeLink === "chart" ? "active" : ""}
              >
                <BiPieChartAlt2 style={{ width: "20px", height: "20px" }} />
              </li>
            </NavLink>

            <NavLink
              to="/about"
              exact
              activeclassname="active"
              className="nav_link"
            >
              <li
                id="eye"
                onClick={handleLinkClick}
                className={activeLink === "eye" ? "active" : ""}
              >
                <BiShow style={{ width: "20px", height: "20px" }} />
              </li>
            </NavLink>

            <NavLink
              to="/about"
              exact
              activeclassname="active"
              className="nav_link"
            >
              <li
                id="marker"
                onClick={handleLinkClick}
                className={activeLink === "marker" ? "active" : ""}
              >
                <GoLocation style={{ width: "20px", height: "20px" }} />
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="logout">
          <li>
            <Link to="/login" exact>
              <TbDoorExit style={{ width: "20px", height: "20px" }} />
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
