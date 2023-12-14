import type { ZoningDistrictClass } from "./ZoningDistrictClass";

export type GetZoningDistrictClassesByTaxLotBblPathParams = {
  /**
   * @type string
   */
  bbl: string;
};

/**
 * @description An object containing zoning district class schemas.
 */
export type GetZoningDistrictClassesByTaxLotBblQueryResponse = {
  /**
   * @type array
   */
  zoningDistrictClasses: ZoningDistrictClass[];
};