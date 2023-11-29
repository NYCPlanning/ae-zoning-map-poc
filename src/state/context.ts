import { createContext } from "react";
import { initialMapState } from "./reducer";
import { MapCtxtType } from "./types";

export const MapCtxt = createContext<MapCtxtType>({
  mapState: initialMapState,
  mapActionsDispatch: {} as any,
});
