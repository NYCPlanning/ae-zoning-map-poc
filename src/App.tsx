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
import { useGetAllZoningDistrictClasses, useGetTaxLotByBbl } from "./gen";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { useStore } from "./store";
import { DataFilterExtension } from "@deck.gl/extensions/typed";

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

  const anyZoningDistrictsVisibility = useStore(
    (state) => state.anyZoningDistrictsVisibility,
  );
  const visibleZoningDistrictCategories = useStore(
    (state) => state.visibleZoningDistrictCategories,
  );
  const visibleZoningDistrictClasses = useStore(
    (state) => state.visibleZoningDistrictClasses,
  );

  const { data } = useGetAllZoningDistrictClasses();
  const colorKey =
    data === undefined ? {} : processColors(data.zoningDistrictClasses);

  const zoningDistrictsLayer = new MVTLayer({
    id: "zoningDistricts",
    // data: `${import.meta.env.VITE_ZONING_API_URL}/zoning-districts/{z}/{x}/{y}.pbf`,
    data: `https://de-sandbox.nyc3.digitaloceanspaces.com/ae-pilot-project/tilesets/zoning_district/{z}/{x}/{y}.pbf`,
    getLineColor: [192, 0, 192],
    minZoom: 9,
    maxZoom: 10,
    visible: anyZoningDistrictsVisibility,
    pointType: "text",
    getText: (f: any) => f.properties.district,
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 8,
    // filterSize is 2 because we're filtering on two dimensions - category and class
    extensions: [new DataFilterExtension({ filterSize: 2 })],
    getFilterValue: (f: any) => {
      // the label datapoints don't have all of the properties we need, so just always show those for now
      if (f.properties.layerName.includes("label")) {
        return [1, 1];
      }
      // A generic result array with length equivalent to filterSize.
      const result = [0, 0];
      // Loop through the possible categories
      visibleZoningDistrictCategories.forEach((category) => {
        if (Object.prototype.hasOwnProperty.call(f.properties, category)) {
          // If the feature has a property key for this category, set the first number in our result array to 1 (true)
          result[0] = 1;
          // If the class for the category exists in the list of visible class ids, set the second number to 1 (true)
          if (visibleZoningDistrictClasses.has(f.properties[category])) {
            result[1] = 1;
          }
          // For now, we show a district if it belongs to any visible categories
          // therefore, we can break out of the loop as soon as we find one match by returning false
          return false;
        }
      });
      return result;
    },
    // The first array here is the range for filtering by category. The second is the range for filtering by class
    filterRange: [
      [1, 1],
      [1, 1],
    ],
    getFillColor: (f: any) => {
      let color = [192, 192, 192, 255];
      visibleZoningDistrictCategories.forEach((category) => {
        if (Object.prototype.hasOwnProperty.call(f.properties, category)) {
          if (visibleZoningDistrictClasses.has(f.properties[category])) {
            color = colorKey[f.properties[category]];
          }
          return false;
        }
      });
      return color;
    },
    updateTriggers: {
      getFilterValue: [
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
        layers={[taxLotsLayer, zoningDistrictsLayer]}
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
