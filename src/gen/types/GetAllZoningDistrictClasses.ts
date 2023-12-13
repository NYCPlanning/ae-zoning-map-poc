import type { ZoningDistrictClass } from "./ZoningDistrictClass";

/**
 * @description An object containing all zoning district class schemas.
 */
export type GetAllZoningDistrictClassesQueryResponse = {
  /**
   * @type array
   */
  zoningDistrictClasses: ZoningDistrictClass[];
};
