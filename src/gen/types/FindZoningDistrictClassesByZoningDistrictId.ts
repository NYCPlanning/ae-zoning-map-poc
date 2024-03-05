import type { ZoningDistrictClass } from "./ZoningDistrictClass";
import type { Error } from "./Error";

export type FindZoningDistrictClassesByZoningDistrictIdPathParams = {
    /**
     * @type string uuid
    */
    id: string;
};

 /**
 * @description An object of class schemas for the zoning district.
*/
export type FindZoningDistrictClassesByZoningDistrictId200 = {
    /**
     * @type array
    */
    zoningDistrictClasses: ZoningDistrictClass[];
};

 export type FindZoningDistrictClassesByZoningDistrictId400 = Error;

 export type FindZoningDistrictClassesByZoningDistrictId404 = Error;

 export type FindZoningDistrictClassesByZoningDistrictId500 = Error;

 /**
 * @description An object of class schemas for the zoning district.
*/
export type FindZoningDistrictClassesByZoningDistrictIdQueryResponse = {
    /**
     * @type array
    */
    zoningDistrictClasses: ZoningDistrictClass[];
};
export type FindZoningDistrictClassesByZoningDistrictIdQuery = {
    Response: FindZoningDistrictClassesByZoningDistrictIdQueryResponse;
    PathParams: FindZoningDistrictClassesByZoningDistrictIdPathParams;
    Errors: FindZoningDistrictClassesByZoningDistrictId400 | FindZoningDistrictClassesByZoningDistrictId404 | FindZoningDistrictClassesByZoningDistrictId500;
};