import { Accordion, AccordionItem, AccordionPanel, Box, Button } from "@nycplanning/streetscape"
import area from "@turf/area";
// import {area, lineDistance} from "@turf/turf"
import length from "@turf/length";
// import length from "@turf/length";

import { GeoJSONStoreFeatures } from "terra-draw"
import { CloseableModal } from "./CloseableModal";

interface SelectedShapeInfoProps {
    polygon: GeoJSONStoreFeatures[] | null;
}

export const SelectedShapeInfo = ({polygon}: SelectedShapeInfoProps) => {
    const shape = polygon;
    const geometryType = shape ? shape[0]?.geometry.type : "N/A";
    const shapeArea = geometryType === "Polygon" && shape ? area(shape[0]).toFixed(2)
    : "N/A";
    const shapeLength = geometryType === "LineString" && shape ? length(shape[0]).toFixed(2)
    : "N/A";
    console.log("shaparea", shapeArea);
    console.log("shapelength", shapeLength);
    return (
        <>
        <CloseableModal>
                <Box>
                    <div>area: {shapeArea}</div>
                    <div>length: {shapeLength}</div>
                </Box>
            </CloseableModal>
        </>
        
    )
}