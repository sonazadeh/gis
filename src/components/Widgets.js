import { useEffect, useRef } from "react";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Search from "@arcgis/core/widgets/Search";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

const Widgets = ({ view }) => {
  const widgetRef = useRef(null);
  useEffect(() => {
    const home = new Home({
      view,
      container: widgetRef.current,
    });
    view.ui.add(home, "top-left");

    const scaleBar = new ScaleBar({
      view,
      container: widgetRef.current,
    });
    view.ui.add(scaleBar, "bottom-left");

    const search = new Search({
      view,
      container: widgetRef.current,
    });
    view.ui.add(search, "top-right");

    const basemapGallery = new BasemapGallery({
      view,
      container: widgetRef.current,
    });
    view.ui.add(basemapGallery, "bottom-right");

    return () => {
      home.destroy();
      scaleBar.destroy();
      search.destroy();
      basemapGallery.destroy();
    };
  }, [view]);

  return null;
};

export default Widgets;
