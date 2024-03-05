import type { ZoningDistrictClass } from "./ZoningDistrictClass";
import type { Error } from "./Error";

/**
 * @description An object containing all zoning district class schemas.
*/
export type FindZoningDistrictClasses200 = {
    /**
     * @type array
    */
    zoningDistrictClasses: ZoningDistrictClass[];
};

 export type FindZoningDistrictClasses400 = Error;

 export type FindZoningDistrictClasses500 = Error;

 /**
 * @description An object containing all zoning district class schemas.
*/
export type FindZoningDistrictClassesQueryResponse = {
    /**
     * @type array
    */
    zoningDistrictClasses: ZoningDistrictClass[];
};
export type FindZoningDistrictClassesQuery = {
    Response: FindZoningDistrictClassesQueryResponse;
    Errors: FindZoningDistrictClasses400 | FindZoningDistrictClasses500;
};