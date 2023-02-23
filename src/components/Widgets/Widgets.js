import { useEffect, useRef } from "react";
import Home from "@arcgis/core/widgets/Home";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from '@arcgis/core/widgets/Expand';
import './Widgets.css';


const Widgets = ({ view }) => {
  const widgetRef = useRef(null);
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
      index:1,
      position:'top-left'
    });

  

    const basemapGallery = new BasemapGallery({
      view,
      container: widgetRef.current,
    });

    const expand = new Expand({
      view: view,
      content: basemapGallery,
      expandIconClass: 'esri-icon-basemap',
      group: 'top-right'
    });
    
    view.ui.add(expand, 'bottom-left');



    return () => {
      home.destroy();
      search.destroy();
      basemapGallery.destroy();
      expand.destroy();
     
    };
  }, [view]);

  return null;
};

export default Widgets;
