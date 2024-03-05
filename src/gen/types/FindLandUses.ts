import type { LandUse } from "./LandUse";
import type { Error } from "./Error";

/**
 * @description An object containing all land uses.
*/
export type FindLandUses200 = {
    /**
     * @type array
    */
    landUses: LandUse[];
};

 export type FindLandUses400 = Error;

 export type FindLandUses500 = Error;

 /**
 * @description An object containing all land uses.
*/
export type FindLandUsesQueryResponse = {
    /**
     * @type array
    */
    landUses: LandUse[];
};
export type FindLandUsesQuery = {
    Response: FindLandUsesQueryResponse;
    Errors: FindLandUses400 | FindLandUses500;
};