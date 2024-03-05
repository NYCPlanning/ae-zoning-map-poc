import type { TaxLotBasicPage } from "./TaxLotBasicPage";
import type { Error } from "./Error";

export type FindTaxLotsQueryParams = {
    /**
     * @description The maximum number of results to be returned in each response. The default value is 20. It must be between 1 and 100, inclusive.
     * @type integer | undefined
     * @example 100
    */
    limit?: number;
    /**
     * @description The position in the full list to begin returning results. Default offset is 0. If the offset is beyond the end of the list, no results will be returned.
     * @type integer | undefined
     * @example 100
    */
    offset?: number;
} | undefined;

 /**
 * @description An object containing a list of tax lots and pagination metadata
*/
export type FindTaxLots200 = TaxLotBasicPage;

 export type FindTaxLots400 = Error;

 export type FindTaxLots500 = Error;

 /**
 * @description An object containing a list of tax lots and pagination metadata
*/
export type FindTaxLotsQueryResponse = TaxLotBasicPage;
export type FindTaxLotsQuery = {
    Response: FindTaxLotsQueryResponse;
    QueryParams: FindTaxLotsQueryParams;
    Errors: FindTaxLots400 | FindTaxLots500;
};