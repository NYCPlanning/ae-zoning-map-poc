import { useEffect, useMemo, useRef } from "react";
import { useMap } from "react-map-gl/maplibre";
import {TerraDraw} from "terra-draw";
import { setupDraw } from "../utils/setup-draw";
function Drawing() {
    const { current: map } = useMap();
    const drawRef = useRef<TerraDraw>(null);
    const draw = useMemo(() => {
        if (map) {
        const terraDraw = setupDraw(map.getMap());
        terraDraw.start();
        return terraDraw;
        }
    }, [map]);

    useEffect(() => {
        if (draw) {
            draw.on("change", () => {
                console.log("changing");
            })
        }
       
      }, [draw])
    return <></>
}

export default Drawing;