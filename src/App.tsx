import Map, {
  NavigationControl,
  ScaleControl,
  AttributionControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import DeckGL, { DeckGLProps } from "@deck.gl/react/typed";
import { MapProvider } from "react-map-gl/maplibre";
import {
  StreetscapeProvider,
  useMediaQuery,
  Accordion,
  AccordionItem,
} from "@nycplanning/streetscape";
import LocationSearch from "./components/LocationSearch";
import LayersFilters from "./components/LayersFilters";

function updateViewState({ viewState }: DeckGLProps) {
  viewState.longitude = Math.min(
    -73.6311,
    Math.max(-74.3308, viewState.longitude),
  );
  viewState.latitude = Math.min(41.103, Math.max(40.2989, viewState.latitude));
  return viewState;
}

function App() {
  const isMobile = useMediaQuery("(max-width: 767px)")[0];

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
    <StreetscapeProvider>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        onViewStateChange={updateViewState}
      >
        <MapProvider>
          {/* Initial View State must be passed to map, despite being passed into DeckGL, or else the map will not appear until after you interact with it */}
          <Map
            initialViewState={INITIAL_VIEW_STATE}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
            // disable the default attribution
            attributionControl={false}
          >
            <AttributionControl compact={isMobile ? true : false} />

            <NavigationControl
              position={isMobile ? "top-right" : "bottom-right"}
              showCompass={true}
              showZoom={true}
            />

            {isMobile ? null : (
              <ScaleControl
                position="bottom-left"
                maxWidth={200}
                unit="imperial"
              />
            )}
          </Map>

          <img
            className="logo"
            alt="NYC Planning"
            src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
          />
        </MapProvider>

        <Accordion
          id="map-selections"
          position="fixed"
          top={6}
          left={6}
          allowMultiple
          width={"27.5rem"}
        >
          <LocationSearch />
          <AccordionItem bg="white">
            <LayersFilters />
          </AccordionItem>
        </Accordion>
      </DeckGL>
    </StreetscapeProvider>
  );
}

export default App;
