import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWindowSize } from "@react-hook/window-size";
import CONFIG from "./config";

function App() {
  const [width, height] = useWindowSize();

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
      style={{ width: width, height: height }}
      mapStyle={CONFIG.MAPSTYLE}
    />
  );
}

export default App;
