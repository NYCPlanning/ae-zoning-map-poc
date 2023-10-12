import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useWindowSize } from "@react-hook/window-size";

function App() {
  const [width, height] = useWindowSize();
  const isMobile = width < 768;

  return (
    <Map
      initialViewState={{
        longitude: -74.0008,
        latitude: 40.7018,
        zoom: 11,
      }}
      maxZoom={20}
      minZoom={9.5}
      maxBounds={[
        [-74.3308, 40.2989],
        [-73.6311, 41.103],
      ]}
      style={{ width: width, height: height }}
      mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
    >
      <NavigationControl
        position={isMobile ? "top-right" : "bottom-right"} //'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
        showCompass={true}
        showZoom={true}
      />

      <ScaleControl
        position="bottom-left" //'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
        maxWidth={200} //pixels
        unit="imperial" //'imperial' | 'metric' | 'nautical'
      />
    </Map>
  );
}

export default App;
