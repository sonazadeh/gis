
const FeatureLayers = () => {

  const buildingLayer = new FeatureLayer({
    url: "https://servicesdev1.arcgis.com/5uh3wwYLNzBuU0Eu/arcgis/rest/services/DevSummit_Polygons_Layer/FeatureServer/0",
    outFields: ["*"],
    spatialReference: "3857",
    objectIdField: "OBJECTID",
    geometryType: "polygon",
    outSpatialReference: { wkid: 3857 },
    returnGeometry: true,
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


  

  return null;
};

export default FeatureLayers;
