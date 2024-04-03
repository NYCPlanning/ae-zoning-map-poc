import Map, {
  MapRef,
  useControl,
} from "react-map-gl/maplibre";
import { useState, useEffect, useMemo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import {MapboxOverlay as DeckOverlay, MapboxOverlayProps} from "@deck.gl/mapbox/typed"
import { FlyToInterpolator, Layer } from "@deck.gl/core/typed";
import { PathStyleExtension } from "@deck.gl/extensions/typed";
import {
  useMediaQuery,
  Accordion,
  IconButton,
  ButtonGroup,
  Box,
  VStack,
} from "@nycplanning/streetscape";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import LocationSearch from "./components/LocationSearch";
import LayersFilters from "./components/LayersFilters";
import InteractionMode from "./components/InteractionMode";
import { TaxLotDetails } from "./components/TaxLotDetails";
import { hexToRgba, processColors } from "./layers";
import {
  useFindTaxLotGeoJsonByBbl,
  useFindLandUses,
  useFindZoningDistrictClasses,
  useFindZoningDistrictClassesByZoningDistrictId,
  FindTaxLotsQueryParamsGeometry,
  useFindTaxLots,
} from "./gen";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import { useStore } from "./store";
import { DataFilterExtension } from "@deck.gl/extensions/typed";
import { ZoningDistrictDetails } from "./components/ZoningDistrictDetails";
import centroid from "@turf/centroid";
import { setupDraw } from "./utils/setup-draw";
import FeatureCollection from "maplibre-gl"
import { GeoJSONStoreFeatures } from "terra-draw";
import { SelectedTaxLots } from "./components/SelectedTaxLots";
import { SelectedShapeInfo } from "./components/SelectedShapeInfo";

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
  const { data: taxLot } = useFindTaxLotGeoJsonByBbl(
    selectedBbl === null ? "" : selectedBbl,
    {
      query: {
        enabled: selectedBbl !== null,
      },
    },
  );
  useEffect(() => {
    if (taxLot !== undefined) {
      const minMax = centroid(taxLot);
      // This is needed because it won't appear highlighted if tax lot visibility is off
      if (!anyTaxLotsVisibility) {
        toggleAnyTaxLotsVisibility();
      }
      setInfoPane("bbl");
      setViewState({
        ...viewState,
        longitude: minMax.geometry.coordinates[0],
        latitude: minMax.geometry.coordinates[1],
        transitionDuration: 750,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: 18,
      });
    }
  }, [taxLot]);
  const { data: landUses } = useFindLandUses();

  const selectedZoningDistrictId = useStore(
    (state) => state.selectedZoningDistrictId,
  );
  const setSelectedZoningDistrictId = useStore(
    (state) => state.setSelectedZoningDistrictId,
  );
  const { data: zoningDistrictClasses } =
    useFindZoningDistrictClassesByZoningDistrictId(
      selectedZoningDistrictId === null ? "" : selectedZoningDistrictId,
      {
        query: {
          enabled: selectedZoningDistrictId !== null,
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
  const toggleAnyTaxLotsVisibility = useStore(
    (state) => state.toggleAnyTaxLotsVisibility,
  );
  const visibleTaxLotsBoundaries = useStore(
    (state) => state.visibleTaxLotsBoundaries,
  );
  const toggleIsDrawing = useStore(
    (state) => state.toggleIsDrawing,
  );
  const isDrawing = useStore((state) => state.isDrawing);
  const visibleLandUseColors = useStore((state) => state.visibleLandUseColors);

  const { data } = useFindZoningDistrictClasses();
  const colorKey =
    data === undefined ? {} : processColors(data.zoningDistrictClasses);

  const zoningDistrictsLayer = new MVTLayer({
    id: "zoningDistricts",
    // data: `${import.meta.env.VITE_ZONING_API_URL}/zoning-districts/{z}/{x}/{y}.pbf`,
    data: `https://de-sandbox.nyc3.digitaloceanspaces.com/ae-pilot-project/tilesets/zoning_district/{z}/{x}/{y}.pbf`,
    getLineColor: [192, 0, 192],
    minZoom: 9, //MIN_ZOOM,
    maxZoom: 10, //MAX_ZOOM,
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
      setSelectedZoningDistrictId(f.object.properties.id);
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

  // terra-draw stuff
  const [mode, setMode] = useState<string>("polygon");
  const [mapRefObj, setMapRefObj] = useState<MapRef | null>();
  const [geoJsonn, setGeoJson] = useState<FeatureCollection[]>([]);

  const terraDraw = useMemo(() => {
    if (mapRefObj !== null && mapRefObj !== undefined) {
      const map = mapRefObj.getMap();
      const terraDraw = setupDraw(map);
      
      return terraDraw;
    }
  }, [mapRefObj]);

  const changeMode = 
    (newMode: string) => {
      if (terraDraw) {
        console.log("current mode", terraDraw.getMode());
        setMode(newMode);
        terraDraw.setMode(newMode);
        console.log("new mode", terraDraw.getMode());
      }
    };
  const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<GeoJSONStoreFeatures | null>(null);

  useEffect(() => {
    if (terraDraw !== undefined) {
      terraDraw.start(); 
      if (isDrawing === true) {
        terraDraw.setMode(mode);       
      }
      else {
        terraDraw.setMode('static');
      }
    }
  }, [ mode, isDrawing]);

  terraDraw?.on("finish", () => {
    setFeatures(terraDraw.getSnapshot());
  })

  terraDraw?.on("select", (id) => {
    const currentPolygon = features.filter((f) => f.id === id);
    setSelectedPolygon(currentPolygon[0]); 
  })

    console.log(features);
    console.log(selectedPolygon);
    const taxLotQueryParams = {
      
      geometry: selectedPolygon?.geometry.type as FindTaxLotsQueryParamsGeometry,
      lons: selectedPolygon?.geometry.coordinates[0].map((coord: number[]) => coord[0]) as number[],
      lats: selectedPolygon?.geometry.coordinates[0].map((coord: number[]) => coord[1]),
      buffer: 1,
    };

    const { data: taxLots } = useFindTaxLots(
      taxLotQueryParams, {
        query: {
          enabled: selectedPolygon !== null && selectedPolygon !== undefined
        }
      }
    );

  const layers = [taxLotsLayer, zoningDistrictsLayer];
  function DeckGLOverlay(props: MapboxOverlayProps) {
    const overlay = useControl(() => new DeckOverlay(props));
    overlay.setProps(props);
    return null;
  }

  return (
    <>
       <Map
            ref={(ref) => setMapRefObj(ref)}
            initialViewState={viewState}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
            // disable the default attribution
            attributionControl={false}
          >
          <DeckGLOverlay layers={layers} interleaved={true} />
        </Map> 

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
        <InteractionMode mode={mode} changeMode={changeMode} />
        <LocationSearch
          handleBblSearched={(bbl) => {
            setSelectedBbl(bbl);
          }}
        />
        <LayersFilters />
        <TaxLotDetails
          taxLot={taxLot === undefined ? null : taxLot.properties}
        />
        <ZoningDistrictDetails
          zoningDistrictClasses={ isDrawing === false ? 
            new Set(zoningDistrictClasses?.zoningDistrictClasses) : null
          }
        />
      </Accordion>
      {!anyTaxLotsVisibility && !anyZoningDistrictsVisibility && <VStack
          spacing={4}
          align='stretch'
        >
          { taxLots && 
            <Box>
              <SelectedTaxLots 
                taxLots={
                  taxLots === undefined ? null : taxLots.taxLots
                }
              />
            </Box>
          }
          
          { selectedPolygon && 
          <Box>
            <SelectedShapeInfo
              polygon={selectedPolygon === null ? null : selectedPolygon}
            />
          </Box> 
          }
          
        </VStack> }
      
    </>
  );
}

export default App;
