export interface MapState {
  activeLayers: Set<string>;
  activeZoningCategories: Set<String>;
}

export enum MAP_ACTION_TYPE {
  TOGGLE_LAYER_ACTIVE = "toggle_layer_active",
  TOGGLE_ZONING_CATEGORY_ACTIVE = "toggle_zoning_category_active",
}

export type MapAction = {
  type: MAP_ACTION_TYPE.TOGGLE_LAYER_ACTIVE;
  payload: string;
} | {
  type: MAP_ACTION_TYPE.TOGGLE_ZONING_CATEGORY_ACTIVE;
  payload: string;
};

export type MapActionsDispatch = {
  toggleLayerActive: (layer: string) => void;
  toggleZoningCategoryActive: (zoningCategory: string) => void;
};

export type MapCtxtType = {
  mapState: MapState;
  mapActionsDispatch: MapActionsDispatch;
};
