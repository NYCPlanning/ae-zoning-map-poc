import type { TaxLotGeoJson } from "./TaxLotGeoJson";
import type { Error } from "./Error";

export type FindTaxLotGeoJsonByBblPathParams = {
    /**
     * @description The ten character code compromised of a one character borough, five character block, and four character lot codes.
     * @type string
     * @example 1000477501
    */
    bbl: string;
};

 /**
 * @description A tax lot geojson object
*/
export type FindTaxLotGeoJsonByBbl200 = TaxLotGeoJson;

 export type FindTaxLotGeoJsonByBbl400 = Error;

 export type FindTaxLotGeoJsonByBbl404 = Error;

 export type FindTaxLotGeoJsonByBbl500 = Error;

 /**
 * @description A tax lot geojson object
*/
export type FindTaxLotGeoJsonByBblQueryResponse = TaxLotGeoJson;
export type FindTaxLotGeoJsonByBblQuery = {
    Response: FindTaxLotGeoJsonByBblQueryResponse;
    PathParams: FindTaxLotGeoJsonByBblPathParams;
    Errors: FindTaxLotGeoJsonByBbl400 | FindTaxLotGeoJsonByBbl404 | FindTaxLotGeoJsonByBbl500;
};