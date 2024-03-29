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

    const gmap = (
        <Map
            // ref={(ref) => setMapRefObj(ref)}
            initialViewState={viewState}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="https://raw.githubusercontent.com/NYCPlanning/equity-tool/main/src/data/basemap.json"
            // disable the default attribution
            attributionControl={false}
          >

          </Map>
    );

    return (
  gmap
      ); 
}

export default BaseMap;