import { MapState, MapAction, MAP_ACTION_TYPE } from "./types";

export const initialMapState: MapState = {
  zoningDistricts: false,
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case MAP_ACTION_TYPE.UPDATE_ZONING_DISTRICTS_LAYER_VISIBILITY: {
      const oldVisibilty = state.zoningDistricts;
      return {
        ...state,
        zoningDistricts: !oldVisibilty,
      };
    }
    default:
      return state;
  }
}
