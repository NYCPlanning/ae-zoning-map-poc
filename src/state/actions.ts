import { Dispatch } from "react";
import { MapAction, MAP_ACTION_TYPE } from "./types";

export const mapActions = (dispatch: Dispatch<MapAction>) => {
  return {
    updateZoningDistrictsVisibility: (visibility: boolean) =>
      dispatch({
        type: MAP_ACTION_TYPE.UPDATE_ZONING_DISTRICTS_LAYER_VISIBILITY,
        payload: visibility,
      }),
  };
};
