import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWindowSize } from "@react-hook/window-size";
import type { ControlPosition, Unit } from "maplibre-gl";
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
    >
      <NavigationControl
        position={CONFIG.NAVIGATION.POSITION as ControlPosition}
        showCompass={CONFIG.NAVIGATION.COMPASS}
        showZoom={CONFIG.NAVIGATION.ZOOM}
        visualizePitch={CONFIG.NAVIGATION.PITCH}
      />
      <ScaleControl
        position={CONFIG.SCALE.POSITION as ControlPosition}
        maxWidth={CONFIG.SCALE.MAXWIDTH}
        unit={CONFIG.SCALE.UNIT as Unit}
      />
    </Map>
  );
}

export default App;
