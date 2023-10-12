import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import { useWindowSize } from "@react-hook/window-size";
import DeckGL from "@deck.gl/react";

function App() {
  const [width, height] = useWindowSize();
  const isMobile = width < 768;

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -74.0008,
    latitude: 40.7018,
    zoom: 11,
    pitch: 0,
    bearing: 0,
  };

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true}>
      <Map
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

        {isMobile ? null : (
          <ScaleControl
            position="bottom-left" //'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
            maxWidth={200} //pixels
            unit="imperial" //'imperial' | 'metric' | 'nautical'
          />
        )}
      </Map>

      <img
        className="logo"
        alt="NYC Planning"
        src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
      />
    </DeckGL>
  );
}

export default App;
