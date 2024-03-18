import Map, {
  NavigationControl,
  ScaleControl,
  AttributionControl,
  useMap,
  MapProvider,
  MapRef,
  useControl,
} from "react-map-gl/maplibre";
import MapContext from "react-map-gl";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import DeckGL, { DeckGLRef } from "@deck.gl/react/typed";
import {MapboxOverlay as DeckOverlay, MapboxOverlayProps} from "@deck.gl/mapbox/typed"
import { FlyToInterpolator, Layer } from "@deck.gl/core/typed";
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
import InteractionMode from "./components/InteractionMode";
import { TaxLotDetails } from "./components/TaxLotDetails";
import BaseMap from "./components/BaseMap";
import  Drawing  from "./components/Drawing";
import { hexToRgba, processColors } from "./layers";
import {
  useFindTaxLotGeoJsonByBbl,
  useFindLandUses,
  useFindZoningDistrictClasses,
  useFindZoningDistrictClassesByZoningDistrictId,
} from "./gen";
import { MVTLayer } from "@deck.gl/geo-layers/typed";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import { useStore } from "./store";
import { DataFilterExtension } from "@deck.gl/extensions/typed";
import { ZoningDistrictDetails } from "./components/ZoningDistrictDetails";
import centroid from "@turf/centroid";
import { setupDraw } from "./utils/setup-draw";
import { localStorageStore } from "./utils/store-local-storage";
import * as lib from "maplibre-gl";
import {GeoJSONStoreFeatures, TerraDraw, TerraDrawFreehandMode, TerraDrawMapLibreGLAdapter, TerraDrawPolygonMode} from "terra-draw";
import FeatureCollection from "maplibre-gl"
import { geojsonType } from "turf";

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
  const visibleLandUseColors = useStore((state) => state.visibleLandUseColors);

  const isDrawing = useStore((state) => state.isDrawing);


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
  // const [terraDraw, setTerraDraw] = useState<TerraDraw | null>(null);
  const [mapRefObj, setMapRefObj] = useState<MapRef>();
  const [geoJson, setGeoJson] = useState<FeatureCollection[]>([]);
  const [selected, setSelected] = useState<GeoJSONStoreFeatures | undefined>();
  const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);
  
  const editableGeoJsonLayer = new GeoJsonLayer({
    id: "editableGeoJson",
    minZoom: 9,
    maxZoom: 10,
    visible: true,
    data: geoJson
  })

  const {
    clearLocalStorage,
    setLocalStorage,
    getLocalStorage
  } = localStorageStore();

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572#issuecomment-498242139
  // const mapRefObj = useRef<MapRef>(null);
  // const mapRef = mapRefObj.current;
  // console.log(mapRefObj);

  const map = mapRefObj?.getMap();
  // console.debug("map", map);
  // console.log(mapRef);

  // useEffect(() => {
  //   if (mapRefObj === null || mapRefObj === undefined) {
  //     return
  //   }

  //   console.log("maprefobj", mapRefObj);
  //   console.log("map", mapRefObj.getMap());
  //   const map = mapRefObj.getMap();
  //   const draw = new TerraDraw({
  //     adapter: new TerraDrawMapLibreGLAdapter({
  //       map
  //     }),
  //     modes: [new TerraDrawPolygonMode()],
      
  //   });
  //   draw.start();
  //   // draw.setMode('polygon');
  //   setTerraDraw(draw);
    
  // }, [mapRefObj]);


  
  // console.log("terradraw mode", terraDraw?.getMode());

  // const onMapLoad = useCallback(() => {
  //   map?.on('move', () => {
  //     console.log('hi');
  //   });
  // }, [map]);

  // useEffect(() => {
  //   if (mapRef.current === null) {
  //     return
  //   }
  //   // console.debug("mapref.current", mapRef.current.getMap());

  //   const draw = setupDraw(mapRef.current.getMap());
  //   draw.start();
  //   setTerraDraw(draw);

  //   mapRef.current.getMap().on("click", (data: any) => {
  //     console.debug("data", data);
  //   })
  // }, [mapRef.current])

  // terraDraw?.setMode("polygon");
  // console.log(isDrawing);
  const terraDraw = useMemo(() => {
    if (mapRefObj) {
      const map = mapRefObj.getMap();
      const terraDraw = setupDraw(map);
      terraDraw.start();
      terraDraw.setMode('polygon');
      console.log("in usememo");
      // terraDraw?.addFeatures([
      //   {
      //     "type": "Feature",
      //     "properties": {},
      //     "geometry": {
      //       "coordinates": [
      //         [
      //           [
      //             -74.01023669418923,
      //             40.71468455208185
      //           ],
      //           [
      //             -74.01023669418923,
      //             40.71027705429108
      //           ],
      //           [
      //             -74.0037764071362,
      //             40.71027705429108
      //           ],
      //           [
      //             -74.0037764071362,
      //             40.71468455208185
      //           ],
      //           [
      //             -74.01023669418923,
      //             40.71468455208185
      //           ]
      //         ]
      //       ],
      //       "type": "Polygon"
      //     }
      //   }
      // ]);
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

  useEffect(() => {
    if (terraDraw) {
      console.log("in terra useeffect");
      terraDraw.on("change", () => {
        console.log("changing!!!!");
        const snapshot = terraDraw.getSnapshot();
        setGeoJson(snapshot);
        console.debug("snapshot", snapshot);
        // setFeatures(snapshot);
        // setSelected(snapshot.find((f) => f.properties.selected));
        // setLocalStorage(snapshot);
        
      });
      // const snapshot = getLocalStorage()
      // if (snapshot) {
      //   const parsed = JSON.parse(snapshot);
      //   terraDraw.addFeatures(parsed);
      // } 

      // const snapshot = getLocalStorage()
      // if (snapshot) {
      //   const parsed = JSON.parse(snapshot);
      //   draw.addFeatures(parsed);
      // }
    }
  }, [terraDraw]);


  // const drawing = <Drawing />
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
           
          <DeckGLOverlay layers={layers}  />

        </Map> 


      {/* <DeckGL
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
        ContextProvider={MapContext.Provider}
        layers={[taxLotsLayer, zoningDistrictsLayer]}
      >
        {/* <BaseMap viewState={viewState}/> */}
        {/* Initial View State must be passed to map, despite being passed into DeckGL, or else the map will not appear until after you interact with it */}
        {/* <MapProvider> */}
        {/* <Map
            ref={(ref) => setMapRefObj(ref)}
            // initialViewState={viewState}
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
          </Map> */}
        {/* </MapProvider> */}
          
          {/* <img
            className="logo"
            alt="NYC Planning"
            src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
          />
      </DeckGL> */} 
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
          zoningDistrictClasses={
            new Set(zoningDistrictClasses?.zoningDistrictClasses)
          }
        />
      </Accordion>
    </>
  );
}

export default App;
