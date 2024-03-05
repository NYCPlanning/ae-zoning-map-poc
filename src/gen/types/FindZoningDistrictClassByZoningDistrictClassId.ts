import type { ZoningDistrictClass } from "./ZoningDistrictClass";
import type { Error } from "./Error";

export type FindZoningDistrictClassByZoningDistrictClassIdPathParams = {
    /**
     * @type string
    */
    id: string;
};

 /**
 * @description A class schema for a zoning district
*/
export type FindZoningDistrictClassByZoningDistrictClassId200 = ZoningDistrictClass;

 export type FindZoningDistrictClassByZoningDistrictClassId400 = Error;

 export type FindZoningDistrictClassByZoningDistrictClassId404 = Error;

 export type FindZoningDistrictClassByZoningDistrictClassId500 = Error;

 /**
 * @description A class schema for a zoning district
*/
export type FindZoningDistrictClassByZoningDistrictClassIdQueryResponse = ZoningDistrictClass;
export type FindZoningDistrictClassByZoningDistrictClassIdQuery = {
    Response: FindZoningDistrictClassByZoningDistrictClassIdQueryResponse;
    PathParams: FindZoningDistrictClassByZoningDistrictClassIdPathParams;
    Errors: FindZoningDistrictClassByZoningDistrictClassId400 | FindZoningDistrictClassByZoningDistrictClassId404 | FindZoningDistrictClassByZoningDistrictClassId500;
};