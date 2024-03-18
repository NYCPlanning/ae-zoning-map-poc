// import MapLibreGL from "maplibre-gl";
import Map from "react-map-gl/maplibre";
import { FlyToInterpolator, Layer } from "@deck.gl/core/typed";

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
interface BaseMapProps {
  viewState: ViewState;
}

function BaseMap({viewState}: BaseMapProps) {

    // const map = new MapLibreGL.Map({
    //     container: 'map',
    //     style: {
    //       version: 8,
    //       sources: {
    //         "osm-tiles": {
    //           type: "raster",
    //           tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    //           tileSize: 256,
    //           attribution:
    //             '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //         },
    //       },
    //       layers: [
    //         {
    //           id: "osm-tiles",
    //           type: "raster",
    //           source: "osm-tiles",
    //         },
    //       ],
    //     },
    //     center: [-74.0008, 40.7018],
    //     zoom: 10,
    //   });

    const gmap = (
        <Map
            // ref={(ref) => setMapRefObj(ref)}
            initialViewState={viewState}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
            // disable the default attribution
            attributionControl={false}
          >
            {/* <AttributionControl compact={isMobile ? true : false} />

            {isMobile ? null : (
              <ScaleControl
                position="bottom-left"
                maxWidth={200}
                unit="imperial"
              />
            )} */}
          </Map>
    );

    return (
  gmap
      ); 
}

export default BaseMap;