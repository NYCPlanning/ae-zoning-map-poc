import type { ZoningDistrict } from "./ZoningDistrict";
import type { Error } from "./Error";

export type FindZoningDistrictByZoningDistrictIdPathParams = {
    /**
     * @type string uuid
    */
    id: string;
};

 /**
 * @description A zoning district object
*/
export type FindZoningDistrictByZoningDistrictId200 = ZoningDistrict;

 export type FindZoningDistrictByZoningDistrictId400 = Error;

 export type FindZoningDistrictByZoningDistrictId404 = Error;

 export type FindZoningDistrictByZoningDistrictId500 = Error;

 /**
 * @description A zoning district object
*/
export type FindZoningDistrictByZoningDistrictIdQueryResponse = ZoningDistrict;
export type FindZoningDistrictByZoningDistrictIdQuery = {
    Response: FindZoningDistrictByZoningDistrictIdQueryResponse;
    PathParams: FindZoningDistrictByZoningDistrictIdPathParams;
    Errors: FindZoningDistrictByZoningDistrictId400 | FindZoningDistrictByZoningDistrictId404 | FindZoningDistrictByZoningDistrictId500;
};