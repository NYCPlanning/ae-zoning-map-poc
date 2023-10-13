import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import { useWindowWidth } from "@react-hook/window-size";
import DeckGL, { DeckGLProps } from "@deck.gl/react/typed";

function updateViewState({ viewState }: DeckGLProps) {
  viewState.longitude = Math.min(
    -73.6311,
    Math.max(-74.3308, viewState.longitude),
  );
  viewState.latitude = Math.min(41.103, Math.max(40.2989, viewState.latitude));
  return viewState;
}

function App() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -74.0008,
    latitude: 40.7018,
    zoom: 11,
    pitch: 0,
    bearing: 0,
    maxZoom: 20,
    minZoom: 9.5,
    minPitch: 0,
    maxPitch: 0,
  };

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      onViewStateChange={updateViewState}
    >
      <Map
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
      >
        <NavigationControl
          position={isMobile ? "top-right" : "bottom-right"}
          showCompass={true}
          showZoom={true}
        />

        {isMobile ? null : (
          <ScaleControl position="bottom-left" maxWidth={200} unit="imperial" />
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
