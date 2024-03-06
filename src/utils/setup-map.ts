import MapLibreGL, { MapLibreGL as lib } from "maplibre-gl";

export function setupMap({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const maplibreMap =  new MapLibreGL.Map({ 
    center: [lat, lng],
    zoom: zoom, // starting zoom,
    minZoom: 3,
    maxZoom: 20,
    container: "map",
    style: "https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json",
});
    
  return maplibreMap;
}
