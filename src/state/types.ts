export interface MapState {
  /**
   * @description The visibility of the zoning map layer
   * @type boolean
   * @example false
   */
  zoningDistricts: boolean;
}

export enum MAP_ACTION_TYPE {
  UPDATE_ZONING_DISTRICTS_LAYER_VISIBILITY = "update_zoning_districts_layer_visibility",
}

export type MapAction = {
  type: MAP_ACTION_TYPE.UPDATE_ZONING_DISTRICTS_LAYER_VISIBILITY;
  payload: MapState["zoningDistricts"];
};

export type MapActionsDispatch = {
  updateZoningDistrictsVisibility: (zoningDistricts: boolean) => void;
};

export type MapCtxtType = {
  mapState: MapState;
  mapActionsDispatch: MapActionsDispatch;
};
