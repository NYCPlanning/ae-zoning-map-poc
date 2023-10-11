import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import CONFIG from "./config";

function App() {
  return (
    <Map
      initialViewState={{
        longitude: CONFIG.INITIALVIEW.LONG,
        latitude: CONFIG.INITIALVIEW.LAT,
        zoom: CONFIG.INITIALVIEW.ZOOM,
      }}
      maxZoom={CONFIG.BOUNDS.ZOOM.MAX}
      minZoom={CONFIG.BOUNDS.ZOOM.MIN}
      maxBounds={[
        [CONFIG.BOUNDS.WEST, CONFIG.BOUNDS.SOUTH],
        [CONFIG.BOUNDS.EAST, CONFIG.BOUNDS.NORTH],
      ]}
      style={{ width: CONFIG.STYLE.WIDTH, height: CONFIG.STYLE.HEIGHT }}
      mapStyle={CONFIG.MAPSTYLE}
    />
  );
}

export default App;
