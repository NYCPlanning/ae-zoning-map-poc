export interface MapState {
  activeLayers: Set<string>;
}

export enum MAP_ACTION_TYPE {
  TOGGLE_LAYER_ACTIVE = "toggle_layer_active",
}

export type MapAction = {
  type: MAP_ACTION_TYPE.TOGGLE_LAYER_ACTIVE;
  payload: string;
};

export type MapActionsDispatch = {
  toggleLayerActive: (layer: string) => void;
};

export type MapCtxtType = {
  mapState: MapState;
  mapActionsDispatch: MapActionsDispatch;
};
