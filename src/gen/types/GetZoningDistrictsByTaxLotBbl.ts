import type { ZoningDistrict } from "./ZoningDistrict";

export type GetZoningDistrictsByTaxLotBblPathParams = {
  /**
   * @type string
   */
  bbl: string;
};

/**
 * @description An object containing zoning districts.
 */
export type GetZoningDistrictsByTaxLotBblQueryResponse = {
  /**
   * @type array
   */
  zoningDistricts: ZoningDistrict[];
};
