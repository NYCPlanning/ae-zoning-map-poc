import { useEffect, useRef } from "react";
import {
    NavigationControl,
    ScaleControl,
    AttributionControl,
    useMap,
    Map,
  } from "react-map-gl/maplibre";
  import { TerraDraw, TerraDrawMapLibreGLAdapter, TerraDrawRectangleMode } from "terra-draw";
  import { MapLibreGL as lib } from "maplibre-gl";
export const CustomComponent = () => {
    console.log("custom component");
    // const map = useRef<map÷libregl.Map>();
    const mapref = useMap();
    // const usemap = useMap();
    console.log(mapref);
    const current = mapref.current;
    const mymap = mapref.mymap;
    useEffect(() => {
       if (mymap === undefined) {
        return
       }
       const draw = new TerraDraw({
        adapter: new TerraDrawMapLibreGLAdapter({
            map: mymap.getMap(),
        }),
        modes: [new TerraDrawRectangleMode()],
      });
      
      // Start drawing
      draw.start();
      draw.setMode("rectangle");
    })

    // console.log("ineditablelayer");
    // console.log(map.);
    // console.log(map?.getMap());
    // const actualmap = map?.getMap();
    // console.log(actualmap);
    // const adapter = new TerraDrawMapLibreGLAdapter({
    //     // Pass in the map instance
    //     map,
    //   });
    // const draw = new TerraDraw({
    //     adapter: adapter,
    //     modes: [new TerraDrawRectangleMode()],
    //   });
    return (
        <></>
    )
}