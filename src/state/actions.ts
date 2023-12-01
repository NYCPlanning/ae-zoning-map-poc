import { Dispatch } from "react";
import { MapAction, MAP_ACTION_TYPE } from "./types";

export const mapActions = (dispatch: Dispatch<MapAction>) => {
  return {
    toggleLayerActive: (layer: string) =>
      dispatch({
        type: MAP_ACTION_TYPE.TOGGLE_LAYER_ACTIVE,
        payload: layer,
      }),
  };
};
