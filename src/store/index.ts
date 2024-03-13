import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import {
  Feature,
  FeatureCollection,
  Position,
  Point,
  MultiPoint,
  LineString,
  Polygon,
} from "geojson";
import {
  featureCollection,
  lineString,
  multiPoint,
  point,
} from "@turf/helpers";
import distance from "@turf/distance";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import area from "@turf/area";

enableMapSet();

export type DrawMode =
  | "select"
  | "createPoint"
  | "createLineString"
  | "createRectangle";
export type Store = {
  mode: DrawMode;
  updateMode: (mode: DrawMode) => void;
  shapeFeatureCollection: FeatureCollection;
  penFeatureCollection: FeatureCollection;
  clickOnMap: (coordinate: Position) => void;
  hoverOnMap: (coordinate: Position) => void;
  infoPane: "zoningDistrict" | "bbl" | null;
  setInfoPane: (info: "zoningDistrict" | "bbl" | null) => void;
  selectedZoningDistrictId: string | null;
  setSelectedZoningDistrictId: (id: string | null) => void;
  anyZoningDistrictsVisibility: boolean;
  toggleAnyZoningDistrictsVisibility: () => void;
  visibleZoningDistrictCategories: Set<string>;
  toggleZoningDistrictCategoryVisibility: (classId: string) => void;
  visibleZoningDistrictClasses: Set<string>;
  toggleZoningDistrictClassVisibility: (categoryId: string) => void;
  anyTaxLotsVisibility: boolean;
  toggleAnyTaxLotsVisibility: () => void;
  visibleTaxLotsBoundaries: boolean;
  toggleVisibleTaxLotsBoundaries: () => void;
  visibleLandUseColors: boolean;
  toggleVisibleLandUseColors: () => void;
  setDefaultStateBasedOnApiData: (
    zoningDistrictCategoryIds: Array<string>,
    zoningDistrictClassIds: Array<string>,
  ) => void;
};

export const useStore = create<Store>()(
  immer((set) => ({
    mode: "select",
    updateMode: (mode: DrawMode) =>
      set((state) => {
        state.penFeatureCollection.features = [];
        state.mode = mode;
      }),
    shapeFeatureCollection: featureCollection([]) as FeatureCollection,
    penFeatureCollection: featureCollection([]) as FeatureCollection,
    clickOnMap: (coordinate) =>
      set((state) => {
        if (state.mode === "select") return;
        if (state.mode === "createPoint") {
          const pt = point(coordinate) as Feature<Point, null>;
          state.shapeFeatureCollection.features.push(pt);
          state.mode = "select";
        }
        if (state.mode === "createLineString") {
          // Pen feature collections have two features when drawing.
          // The first feature is a crude version of the shape, stored as a multiPoint. Clicking on the map updates the draft.
          // The second feature is the pen - the temporary line - before the next point is selected. Moving the mouse updates the pen
          const crudeShape = state.penFeatureCollection.features[0];

          if (crudeShape === undefined) {
            console.debug("create crude shape");
            const mpt = multiPoint([coordinate]) as Feature<MultiPoint, null>;
            state.penFeatureCollection.features[0] = mpt;

            return;
          } else if (crudeShape.geometry.type === "MultiPoint") {
            const lastCoord =
              crudeShape.geometry.coordinates[
                crudeShape.geometry.coordinates.length - 1
              ];
            const distanceClickAndLastCoord = distance(lastCoord, coordinate, {
              units: "yards",
            });
            if (distanceClickAndLastCoord < 10) {
              // Cannot have a lineString with only one unique point
              if (crudeShape.geometry.coordinates.length === 1) return;
              // End if there is at least 1 unique point already
              const ls = lineString(crudeShape.geometry.coordinates) as Feature<
                LineString,
                null
              >;
              state.shapeFeatureCollection.features.push(ls);
              state.penFeatureCollection.features = [];
              state.mode = "select";
              return;
            }
            // Only allow up to five points
            if (crudeShape.geometry.coordinates.length <= 4) {
              crudeShape.geometry.coordinates.push(coordinate);
            }

            // Check the length again. If it is 5, save the shape
            if (crudeShape.geometry.coordinates.length === 5) {
              const ls = lineString(crudeShape.geometry.coordinates) as Feature<
                LineString,
                null
              >;
              state.shapeFeatureCollection.features.push(ls);
              state.penFeatureCollection.features = [];
              state.mode = "select";
            } else if (crudeShape.geometry.coordinates.length > 5) {
              throw new Error("Two many points in LineString");
            }
          }
        }
        if (state.mode === "createRectangle") {
          // Pen feature collections have two features when drawing.
          // The first feature is a crude version of the shape, stored as a point. It is a static anchor until finished drawing
          // The second feature is a pen- in the shape of a rectangle
          const crudeShape = state.penFeatureCollection.features[0];

          if (crudeShape === undefined) {
            console.debug("create crude shape");
            const pt = point(coordinate) as Feature<Point, null>;
            state.penFeatureCollection.features[0] = pt;

            return;
          } else if (crudeShape.geometry.type === "Point") {
            const penShape = state.penFeatureCollection.features[1];
            if (penShape?.geometry.type === "Polygon") {
              const penArea = area(penShape as Feature<Polygon, null>);
              if (penArea > 10) {
                state.shapeFeatureCollection.features.push(penShape);
              }
            }
            // Attempt to finish by saving the polygon in the shape
            state.penFeatureCollection.features = [];
            state.mode = "select";
          }
        }
      }),
    hoverOnMap: (coordinate) =>
      set((state) => {
        if (state.mode === "select") return;

        if (state.mode === "createLineString") {
          const crudeShape = state.penFeatureCollection.features[0];
          if (crudeShape === undefined) {
            // If there is no shape, then we cannot create a pen from it
            return;
          }

          // The pen consists of the points from the crude shape and a point from the mouse position
          if (crudeShape.geometry.type === "MultiPoint") {
            const penShape = state.penFeatureCollection.features[1];
            const penCoordinates = [
              ...crudeShape.geometry.coordinates,
              coordinate,
            ];
            if (penShape === undefined) {
              const ls = lineString(penCoordinates) as Feature<LineString>;
              state.penFeatureCollection.features[1] = ls;
            } else if (penShape.geometry.type === "LineString") {
              penShape.geometry.coordinates = penCoordinates;
            }
          }
        }

        if (state.mode === "createRectangle") {
          const crudeShape = state.penFeatureCollection.features[0];
          if (crudeShape === undefined) return;
          if (crudeShape.geometry.type === "Point") {
            const anchor = crudeShape.geometry.coordinates;
            // const anchorToMouseDistance = distance(anchor, coordinate, {
            //   units: "yards",
            // });
            // console.debug("anchorToMouseDistance", anchorToMouseDistance);
            // if (anchorToMouseDistance < 10) return;
            const ls = lineString([anchor, coordinate]);
            const penBBox = bbox(ls);
            const pen = bboxPolygon(penBBox) as Feature<Polygon, null>;
            state.penFeatureCollection.features[1] = pen;
          }
        }
      }),
    infoPane: null,
    setInfoPane: (info: "zoningDistrict" | "bbl" | null) =>
      set(() => ({
        infoPane: info,
      })),
    selectedZoningDistrictId: null,
    setSelectedZoningDistrictId: (id: string | null) =>
      set(() => ({
        selectedZoningDistrictId: id,
      })),
    anyZoningDistrictsVisibility: false,
    toggleAnyZoningDistrictsVisibility: () =>
      set((state) => ({
        anyZoningDistrictsVisibility: !state.anyZoningDistrictsVisibility,
      })),
    visibleZoningDistrictCategories: new Set([]),
    toggleZoningDistrictCategoryVisibility: (classId: string) =>
      set((state) => ({
        visibleZoningDistrictCategories: toggleVisibility(
          state.visibleZoningDistrictCategories,
          classId,
        ),
      })),
    visibleZoningDistrictClasses: new Set([]),
    toggleZoningDistrictClassVisibility: (categoryId: string) =>
      set((state) => ({
        visibleZoningDistrictClasses: toggleVisibility(
          state.visibleZoningDistrictClasses,
          categoryId,
        ),
        anyZoningDistrictsVisibility: layerVisibilityCheck(
          state.visibleZoningDistrictClasses,
        ),
      })),
    anyTaxLotsVisibility: false,
    toggleAnyTaxLotsVisibility: () =>
      set((state) => ({
        anyTaxLotsVisibility: !state.anyTaxLotsVisibility,
      })),
    visibleTaxLotsBoundaries: false,
    toggleVisibleTaxLotsBoundaries: () =>
      set((state) => ({
        visibleTaxLotsBoundaries: !state.visibleTaxLotsBoundaries,
      })),
    visibleLandUseColors: false,
    toggleVisibleLandUseColors: () =>
      set((state) => ({
        visibleLandUseColors: !state.visibleLandUseColors,
      })),
    setDefaultStateBasedOnApiData: (
      zoningDistrictCategoryIds: Array<string>,
      zoningDistrictClassIds: Array<string>,
    ) =>
      set((state) => ({
        visibleZoningDistrictCategories: addToList(
          state.visibleZoningDistrictCategories,
          zoningDistrictCategoryIds,
        ),
        visibleZoningDistrictClasses: addToList(
          state.visibleZoningDistrictClasses,
          zoningDistrictClassIds,
        ),
      })),
  })),
);

function toggleVisibility(list: Set<string>, id: string) {
  const newSet = new Set(list);
  newSet.has(id) ? newSet.delete(id) : newSet.add(id);
  return newSet;
}

function layerVisibilityCheck(list: Set<string>) {
  return list.size == 0 ? false : true;
}

function addToList(list: Set<string>, ids: Array<string>) {
  const newSet = new Set(list);
  ids.forEach((id) => newSet.add(id));
  return newSet;
}
