import { MapState, MapAction, MAP_ACTION_TYPE } from "./types";
import cloneDeep from "lodash.clonedeep";

export const TOP_LEVEL_LAYERS = {
  ZONING: "zoningDistricts",
  TAX_LOT: "taxLots",
};

export const initialMapState: MapState = {
  activeLayers: new Set([TOP_LEVEL_LAYERS.ZONING]),
  activeZoningCategories: new Set(["Commercial", "Manufacturing", "Residential"]),
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case MAP_ACTION_TYPE.TOGGLE_LAYER_ACTIVE: {
      const toggledLayer = action.payload;
      const activeLayers = cloneDeep(state.activeLayers);
      activeLayers.has(toggledLayer)
        ? activeLayers.delete(toggledLayer)
        : activeLayers.add(toggledLayer);
      return {
        ...state,
        activeLayers,
      };
    } 
    case MAP_ACTION_TYPE.TOGGLE_ZONING_CATEGORY_ACTIVE: {
      const toggledZoningCategory = action.payload;
      const activeZoningCategories = cloneDeep(state.activeZoningCategories)
      activeZoningCategories.has(toggledZoningCategory) ? activeZoningCategories.delete(toggledZoningCategory) : activeZoningCategories.add(toggledZoningCategory)
      return {
        ...state,
        activeZoningCategories
      }
    }
    default:
      return state;
  }
}
