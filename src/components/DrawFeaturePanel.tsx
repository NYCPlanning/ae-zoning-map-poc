import { Box, Button, Text } from "@nycplanning/streetscape";
import { useStore } from "../store";
import area from "@turf/area";
import { Feature, Polygon } from "geojson";

export function DrawFeaturePanel() {
  const {
    selectedDrawFeatureId,
    drawFeaturePanelLocation,
    shapeFeatureCollection,
    clearSelectedFeature,
  } = useStore();
  const selectShape = shapeFeatureCollection.features.find(
    (feature) => feature.id === selectedDrawFeatureId,
  );
  if (selectedDrawFeatureId === null || drawFeaturePanelLocation === null)
    return <></>;
  return (
    <Box
      position={"absolute"}
      zIndex={4}
      bottom={drawFeaturePanelLocation.bottom}
      left={drawFeaturePanelLocation.left}
      backgroundColor={"gray.100"}
    >
      <Text>{selectShape?.geometry.type}</Text>
      {selectShape?.geometry.type === "Polygon" && (
        <Text>{`Area: ${area(
          selectShape as Feature<Polygon, null>,
        )} meters`}</Text>
      )}
      <Button size="sm" onClick={clearSelectedFeature}>
        Close
      </Button>
    </Box>
  );
}
