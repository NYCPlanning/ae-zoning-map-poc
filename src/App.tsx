import Map, {
  NavigationControl,
  ScaleControl,
  AttributionControl,
} from "react-map-gl/maplibre";
import { useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import DeckGL, { DeckGLProps } from "@deck.gl/react/typed";
import { MapProvider } from "react-map-gl/maplibre";
import { useMediaQuery, Accordion } from "@nycplanning/streetscape";
import LocationSearch from "./components/LocationSearch";
import LayersFilters from "./components/LayersFilters";
import { TaxLotDetails } from "./components/TaxLotDetails";
import { taxLotsLayer, processColors } from "./layers";
import { useGetTaxLotByBbl } from "./gen";
import { useGetZoningDistrictClasses } from "./gen/hooks/useGetZoningDistrictClasses";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { useStore } from "./store";
import { DataFilterExtension } from "@deck.gl/extensions";


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
  const [selectedBbl, setSelectedBbl] = useState<string | null>(null);
  const { data: taxLot } = useGetTaxLotByBbl(
    selectedBbl === null ? "" : selectedBbl,
    {
      query: {
        enabled: selectedBbl !== null,
      },
    },
  );

  const allZoningDistrictsVisibility = useStore(
    (state) => state.allZoningDistrictsVisibility,
  );
  const visibleZoningDistrictClasses = useStore(
    (state) => state.visibleZoningDistrictClasses,
  );
  const visibleZoningDistrictCategories = useStore(
    (state) => state.visibleZoningDistrictCategories,
  );
  const wholeStore = useStore(
    (state) => state,
  );

  const colorKey = processColors(useGetZoningDistrictClasses().data);

  const allZoningDistrictsLayer = new MVTLayer({
    id: "zoningDistricts",
    // data: `${import.meta.env.VITE_ZONING_API_URL}/zoning-districts/{z}/{x}/{y}.pbf`,
    data: `https://de-sandbox.nyc3.digitaloceanspaces.com/ae-pilot-project/tilesets/zoning_district/{z}/{x}/{y}.pbf`,
    getLineColor: [192, 0, 192],
    extensions: [new DataFilterExtension({filterSize: 1})],
    getFilterValue: (f: any) => {
      return (allZoningDistrictsVisibility ||
             (visibleZoningDistrictClasses.has(f.properties.district[0])) &&
             visibleZoningDistrictCategories.has(f.properties.district.match(/\w\d*/)[0])) ?
              1 : 0;
    },
    filterRange: [1, 1],
    getFillColor: (f: any) => {
      return (
        colorKey[f.properties.district.match(/\w\d*/)[0]] || [
          192,
          192,
          192,
          [1],
        ]
      );
    },
    updateTriggers: {
      getFilterValue: [wholeStore],
      getFillColor: [wholeStore]
    },
  });

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -74.0008,
    latitude: 40.7018,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    maxZoom: 11,
    minZoom: 10,
    minPitch: 0,
    maxPitch: 0,
  };

  return (
    <MapProvider>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        onViewStateChange={updateViewState}
        layers={[taxLotsLayer, allZoningDistrictsLayer]}
      >
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

        <Accordion
          id="map-selections"
          position="fixed"
          top={6}
          left={6}
          allowMultiple
          width={"27.5rem"}
          defaultIndex={[0, 1]}
        >
          <LocationSearch
            handleBblSearched={(bbl) => {
              setSelectedBbl(bbl);
            }}
          />
          <LayersFilters />

          <TaxLotDetails taxLot={taxLot === undefined ? null : taxLot} />
        </Accordion>
      </DeckGL>
    </MapProvider>
  );
}

export default App;
