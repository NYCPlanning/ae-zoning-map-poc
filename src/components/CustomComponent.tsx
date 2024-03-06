import { useEffect, useMemo, useRef, useState } from "react";
import {
    NavigationControl,
    ScaleControl,
    AttributionControl,
    useMap,
    Map,
  } from "react-map-gl/maplibre";

  import { 
    TerraDraw, 
    GeoJSONStoreFeatures, 
    TerraDrawMapLibreGLAdapter, 
    TerraDrawRectangleMode, 
    TerraDrawPolygonMode,
    TerraDrawGreatCircleMode,
    TerraDrawPointMode,
    TerraDrawSelectMode,
    TerraDrawLineStringMode,
    TerraDrawCircleMode,
    TerraDrawFreehandMode,
    TerraDrawRenderMode, 
 } from "terra-draw";
export const CustomComponent = () => {
    const [selected, setSelected] = useState<GeoJSONStoreFeatures | undefined>();
    const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);
    console.log("custom component");
    const mapref= useMap();
    // console.log(mapref);
    // const current = mapref.current;
    const mymap = mapref.mymap;
    const draw = useMemo(() => {
        if (mymap) {
          const terraDraw = new TerraDraw({
            adapter: new TerraDrawMapLibreGLAdapter({
                map: mymap.getMap(),
            }),
            modes: [
                new TerraDrawSelectMode({
                  flags: {
                    arbitary: {
                      feature: {},
                    },
                    polygon: {
                      feature: {
                        scaleable: true,
                        rotateable: true,
                        draggable: true,
                        coordinates: {
                          midpoints: true,
                          draggable: true,
                          deletable: true,
                        },
                      },
                    },
                    linestring: {
                      feature: {
                        draggable: true,
                        coordinates: {
                          midpoints: true,
                          draggable: true,
                          deletable: true,
                        },
                      },
                    },
                    circle: {
                      feature: {
                        draggable: true,
                      },
                    },
                    point: {
                      feature: {
                        draggable: true,
                      },
                    },
                    freehand: {
                      feature: {
                        draggable: true,
                      },
                    },
                  },
                }),
                new TerraDrawPointMode(),
                new TerraDrawLineStringMode({
                  snapping: true,
                  allowSelfIntersections: false,
                }),
                new TerraDrawGreatCircleMode({
                  snapping: true,
                }),
                new TerraDrawPolygonMode({
                  // snapping: true,
                  allowSelfIntersections: false,
                  pointerDistance: 30,
                }),
                new TerraDrawCircleMode(),
                new TerraDrawFreehandMode(),
                new TerraDrawRenderMode({
                  modeName: 'arbitary',
                  styles: {
                    polygonFillColor: "#4357AD",
                    polygonOutlineColor: "#48A9A6",
                    polygonOutlineWidth: 2,
                  },
                }),
              ],
          });
          terraDraw.start();
          return terraDraw;
        }
      }, [mymap]);
      draw?.setMode("polygon");


      useEffect(() => {
        if (draw) {
          draw.on("change", () => {
            const snapshot = draw.getSnapshot();
            setFeatures(snapshot);
            // console.log(snapshot);
            // setSelected(snapshot.find((f) => f.properties.selected));
            // // setLocalStorage(snapshot);
            // console.log("features", features);
            // console.log("selected", selected);
            console.log(draw.getSnapshot());
          });
    
        //   const snapshot = getLocalStorage()
        //   if (snapshot) {
        //     const parsed = JSON.parse(snapshot);
        //     draw.addFeatures(parsed);
        //   }
        
    }
        
      }, [draw]);
    // draw?.setMode("select");
      
    // useEffect(() => {
    //    if (mymap === undefined) {
    //     return
    //    }
    //    const draw = new TerraDraw({
    //     adapter: new TerraDrawMapLibreGLAdapter({
    //         map: mymap.getMap(),
    //     }),
    //     modes: [new TerraDrawPolygonMode()],
    //   });
      
    //   // Start drawing
    //   draw.start();
      
    // })

    return (
        <>
        
    </>
    )
}