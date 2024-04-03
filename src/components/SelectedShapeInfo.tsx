import { Box } from "@nycplanning/streetscape"
import area from "@turf/area";
import length from "@turf/length";

import { GeoJSONStoreFeatures } from "terra-draw"
import { CloseableModal } from "./CloseableModal";

interface SelectedShapeInfoProps {
    polygon: GeoJSONStoreFeatures | null;
}

export const SelectedShapeInfo = ({polygon}: SelectedShapeInfoProps) => {
    const shape = polygon;
    const geometryType = shape ? shape?.geometry.type : "N/A";
    const shapeArea = geometryType === "Polygon" && shape ? area(shape).toFixed(2)
    : "N/A";
    const shapeLengthFeet = geometryType === "LineString" && shape ? length(shape, {units: 'feet'}).toFixed(2)
    : "N/A";
    const shapeLengthMeters = geometryType === "LineString" && shape ? length(shape, {units: 'meters'}).toFixed(2)
    : "N/A"; 
    return (
        <>
        <CloseableModal>
                <Box>
                    <div>area: {shapeArea}</div>
                    <div>length: {shapeLengthFeet} ft</div>
                    <div>length: {shapeLengthMeters} m</div>
                </Box>
            </CloseableModal>
        </>
        
    )
}