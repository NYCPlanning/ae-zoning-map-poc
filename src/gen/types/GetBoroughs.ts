import type { Borough } from "./Borough";

/**
 * @description An object containing all boroughs.
 */
export type GetBoroughsQueryResponse = {
  /**
   * @type array
   */
  boroughs: Borough[];
};
