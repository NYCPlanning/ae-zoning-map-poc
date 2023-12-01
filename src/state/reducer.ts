import { MapState, MapAction, MAP_ACTION_TYPE } from "./types";
import cloneDeep from "lodash.clonedeep";

export const TOP_LEVEL_LAYERS = {
  ZONING: "zoningDistricts",
  TAX_LOT: "taxLots",
};

export const initialMapState: MapState = {
  activeLayers: new Set([TOP_LEVEL_LAYERS.ZONING]),
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
    default:
      return state;
  }
}
