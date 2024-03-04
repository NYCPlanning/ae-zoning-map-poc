import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";
import {
  TerraDraw,
  TerraDrawMapLibreGLAdapter,
  TerraDrawRectangleMode,
} from "terra-draw";
export const CustomComponent = () => {
  const { mymap } = useMap();
  useEffect(() => {
    if (mymap === undefined) return;

    const draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({
        map: mymap.getMap(),
      }),
      modes: [new TerraDrawRectangleMode()],
    });

    // Start drawing
    draw.start();
    draw.setMode("rectangle");
  }, [mymap]);

  return <></>;
};
