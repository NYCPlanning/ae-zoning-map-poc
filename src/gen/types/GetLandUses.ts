import type { LandUse } from "./LandUse";

/**
 * @description An object containing all land uses.
 */
export type GetLandUsesQueryResponse = {
  /**
   * @type array
   */
  landUses: LandUse[];
};
