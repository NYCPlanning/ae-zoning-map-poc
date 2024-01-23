import Map, {
  NavigationControl,
  ScaleControl,
  AttributionControl,
} from "react-map-gl/maplibre";
import { useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import DeckGL from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { PathStyleExtension } from "@deck.gl/extensions/typed";
import {
  useMediaQuery,
  Accordion,
  IconButton,
  ButtonGroup,
} from "@nycplanning/streetscape";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import LocationSearch from "./components/LocationSearch";
import LayersFilters from "./components/LayersFilters";
import { TaxLotDetails } from "./components/TaxLotDetails";
import { hexToRgba, processColors } from "./layers";
import {
  useGetAllZoningDistrictClasses,
  useGetLandUses,
  useGetTaxLotByBbl,
  useGetZoningDistrictClassesByUuid,
} from "./gen";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { useStore } from "./store";
import { DataFilterExtension } from "@deck.gl/extensions/typed";
import { ZoningDistrictDetails } from "./components/ZoningDistrictDetails";

type ViewState = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  transitionDuration?: number;
  transitionEasing?: (t: number) => number;
  transitionInterpolator?: FlyToInterpolator;
};

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
  const { data: landUses } = useGetLandUses();

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

  const MAX_ZOOM = 20;
  const MIN_ZOOM = 10;

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
  const anyTaxLotsVisibility = useStore((state) => state.anyTaxLotsVisibility);
  const visibleTaxLotsBoundaries = useStore(
    (state) => state.visibleTaxLotsBoundaries,
  );
  const visibleLandUseColors = useStore((state) => state.visibleLandUseColors);

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
    pickable: true,
    onClick: (f: any) => {
      setSelectedZoningDistrictUuid(f.object.properties.id);
      setInfoPane("zoningDistrict");
    },
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

  const taxLotsLayer = new MVTLayer({
    id: "taxLots",
    // data: `${import.meta.env.VITE_ZONING_API_URL}/tax-lot/{z}/{x}/{y}.pbf`,
    data: `https://de-sandbox.nyc3.digitaloceanspaces.com/ae-pilot-project/tilesets/tax_lot/{z}/{x}/{y}.pbf`,
    getLineColor: (f: any) => {
      if (
        selectedBbl ===
        `${f.properties.borough}${f.properties.block}${f.properties.lot}`
      ) {
        return [43, 108, 176, 255];
      }
      let color = [0, 0, 0, 0];
      if (visibleTaxLotsBoundaries) color = [0, 0, 0];
      return color;
    },
    extensions: [new PathStyleExtension({ dash: true })],
    getDashArray: (f: any) => {
      if (
        selectedBbl ===
        `${f.properties.borough}${f.properties.block}${f.properties.lot}`
      ) {
        return [2, 1.5];
      }
      return [2, 0];
    },
    visible: anyTaxLotsVisibility,
    pickable: true,
    minZoom: 15,
    maxZoom: 16,
    getFillColor: (f: any) => {
      if (
        selectedBbl ===
        `${f.properties.borough}${f.properties.block}${f.properties.lot}`
      ) {
        return [43, 108, 176, 153];
      }
      let color = [192, 192, 192, 0];
      if (visibleLandUseColors && f.properties.layerName === "fill") {
        const landUseId = f.properties.landUseId;
        const landUseColor = landUses?.landUses
          ? landUses.landUses.find((landUse) => landUseId === landUse.id)?.color
          : null;
        const landUseColorHex = landUseColor ? hexToRgba(landUseColor) : null;
        color = landUseColorHex ? landUseColorHex : color;
      }
      return color;
    },
    pointType: "text",
    getText: (f: any) => f.properties.lot,
    onClick: (f: any) => {
      setSelectedBbl(
        `${f.object.properties.borough}${f.object.properties.block}${f.object.properties.lot}`,
      );
      setInfoPane("bbl");
      setViewState({
        ...viewState,
        longitude: f.coordinate[0],
        latitude: f.coordinate[1],
        transitionDuration: 750,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
      });
    },
    getTextColor: [98, 98, 98, 255],
    textFontFamily: "Helvetica Neue, Arial, sans-serif",
    getTextSize: 8,
    updateTriggers: {
      getLineColor: [visibleTaxLotsBoundaries, selectedBbl],
      getDashArray: [selectedBbl],
      getFillColor: [visibleLandUseColors, selectedBbl],
    },
  });

  const [viewState, setViewState] = useState<ViewState>({
    longitude: -74.0008,
    latitude: 40.7018,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  return (
    <>
      <DeckGL
        controller={{
          doubleClickZoom: false,
        }}
        viewState={viewState}
        onViewStateChange={({ viewState: newViewState }) => {
          setViewState({
            longitude: Math.min(
              -73.6311,
              Math.max(-74.3308, newViewState.longitude),
            ),
            latitude: Math.min(
              41.103,
              Math.max(40.2989, newViewState.latitude),
            ),
            bearing: newViewState.bearing,
            pitch: newViewState.pitch,
            zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newViewState.zoom)),
          });
        }}
        layers={[taxLotsLayer, zoningDistrictsLayer]}
      >
        {/* Initial View State must be passed to map, despite being passed into DeckGL, or else the map will not appear until after you interact with it */}
        <Map
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
          // disable the default attribution
          attributionControl={false}
        >
          <AttributionControl compact={isMobile ? true : false} />

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
      </DeckGL>
      <ButtonGroup
        position="absolute"
        bottom={["unset", 28]}
        top={[4, "unset"]}
        right={6}
        isAttached={true}
        orientation="vertical"
      >
        <IconButton
          minH={8}
          minW={8}
          _active={{
            background: "white",
          }}
          variant={"secondary"}
          aria-label="Zoom in"
          icon={<AddIcon />}
          onClick={() => {
            viewState.zoom < MAX_ZOOM &&
              setViewState({
                ...viewState,
                zoom: viewState.zoom + 1,
                transitionDuration: 750,
                transitionEasing: (x) => {
                  return 1 - Math.pow(1 - x, 4);
                },
              });
          }}
        />
        <IconButton
          minH={8}
          minW={8}
          _active={{
            background: "white",
          }}
          variant={"secondary"}
          aria-label="Zoom out"
          icon={<MinusIcon />}
          onClick={() => {
            viewState.zoom > MIN_ZOOM &&
              setViewState({
                ...viewState,
                zoom: viewState.zoom - 1,
                transitionDuration: 750,
                transitionEasing: (x) => {
                  return 1 - Math.pow(1 - x, 4);
                },
              });
          }}
        />
      </ButtonGroup>
      <Accordion
        id="map-selections"
        position="fixed"
        top={6}
        left={6}
        allowMultiple
        width={"21.25rem"}
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
    </>
  );
}

export default App;
