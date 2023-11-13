import type { Position } from "./Position";

export const multiPolygonType = {
  MultiPolygon: "MultiPolygon",
} as const;
export type MultiPolygonType =
  (typeof multiPolygonType)[keyof typeof multiPolygonType];
export type MultiPolygon = {
  /**
   * @type string | undefined
   */
  type?: MultiPolygonType;
  /**
   * @description Array of polygon coordinate arrays.
   * @type array | undefined
   */
  coordinates?: Position[][][];
};
