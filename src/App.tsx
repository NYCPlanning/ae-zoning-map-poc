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
import { ZoningDistrictDetails } from "./components/ZoningDistrictDetails";
import { useGetTaxLotByBbl, useGetZoningDistrictClassesByUuid } from "./gen";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { useStore } from "./store";

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

  const selectedZoningDistrictUuid = useStore(
    (state) => state.selectedZoningDistrictUuid,
  );
  const setSelectedZoningDistrictUuid = useStore(
    (state) => state.setSelectedZoningDistrictUuid,
  );
  const { data: zoningDistrictClasses } = useGetZoningDistrictClassesByUuid(
    selectedZoningDistrictUuid === null ? "" : selectedZoningDistrictUuid,
    {
      query: {
        enabled: selectedZoningDistrictUuid !== null,
      },
    },
  );

  const setInfoPane = useStore((state) => state.setInfoPane);
  const anyZoningDistrictsVisibility = useStore(
    (state) => state.anyZoningDistrictsVisibility,
  );
  const visibleZoningDistrictCategories = useStore(
    (state) => state.visibleZoningDistrictCategories,
  );
  const visibleZoningDistrictClasses = useStore(
    (state) => state.visibleZoningDistrictClasses,
  );

  const zoningDistrictsLayer = new MVTLayer({
    id: "zoning_district_fill",
    data: `http://localhost:3000/api/zoning-districts/fills/{z}/{x}/{y}`,
    visible: anyZoningDistrictsVisibility,
    getFillColor: (f: any) => {
      const color = JSON.parse(f.properties.color);
      color[3] =
        visibleZoningDistrictCategories.has(
          f.properties.category.toLowerCase(),
        ) && visibleZoningDistrictClasses.has(f.properties.class)
          ? 120
          : 0;

      return color;
    },
    getLineColor: [192, 192, 192],
    updateTriggers: {
      getFillColor: [
        visibleZoningDistrictCategories.size,
        visibleZoningDistrictClasses.size,
      ],
    },
  });

  const zoningDistrictsLabelLayer = new MVTLayer({
    id: "zoning_district_label",
    data: `http://localhost:3000/api/zoning-districts/labels/{z}/{x}/{y}`,
    visible: anyZoningDistrictsVisibility,
    minZoom: 14,
    pointType: "text",
    getTextColor: (f: any) => {
      const color = [98, 98, 98, 255];
      const zoningCategories: Array<string> = JSON.parse(f.properties.category);
      const zoningClasses: Array<string> = JSON.parse(f.properties.class);
      const hasActiveCategory = zoningCategories.some((zoningCategory) =>
        visibleZoningDistrictCategories.has(zoningCategory.toLowerCase()),
      );
      const hasActiveClass = zoningClasses.some((zoningClass) =>
        visibleZoningDistrictClasses.has(zoningClass),
      );
      color[3] = hasActiveCategory && hasActiveClass ? 120 : 0;
      return color;
    },
    getTextSize: 12,
    getText: (f: any) => {
      return f.properties.label;
    },
    textMaxWidth: 3,
    updateTriggers: {
      getTextColor: [
        visibleZoningDistrictCategories.size,
        visibleZoningDistrictClasses.size,
      ],
    },
  });

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -74.0008,
    latitude: 40.7018,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    maxZoom: 20,
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
        // layers={[zoningDistrictsLabelLayer]}
        layers={[zoningDistrictsLayer, zoningDistrictsLabelLayer]}
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
              setInfoPane("bbl");
            }}
          />
          <LayersFilters />

          <TaxLotDetails taxLot={taxLot === undefined ? null : taxLot} />
          <ZoningDistrictDetails
            zoningDistrictClasses={
              new Set(zoningDistrictClasses?.zoningDistrictClasses)
            }
          />
        </Accordion>
      </DeckGL>
    </MapProvider>
  );
}

export default App;
