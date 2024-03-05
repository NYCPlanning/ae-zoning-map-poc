import type { TaxLot } from "./TaxLot";
import type { Error } from "./Error";

export type FindTaxLotByBblPathParams = {
    /**
     * @description The ten character code compromised of a one character borough, five character block, and four character lot codes.
     * @type string
     * @example 1000477501
    */
    bbl: string;
};

 /**
 * @description A tax lot object
*/
export type FindTaxLotByBbl200 = TaxLot;

 export type FindTaxLotByBbl400 = Error;

 export type FindTaxLotByBbl404 = Error;

 export type FindTaxLotByBbl500 = Error;

 /**
 * @description A tax lot object
*/
export type FindTaxLotByBblQueryResponse = TaxLot;
export type FindTaxLotByBblQuery = {
    Response: FindTaxLotByBblQueryResponse;
    PathParams: FindTaxLotByBblPathParams;
    Errors: FindTaxLotByBbl400 | FindTaxLotByBbl404 | FindTaxLotByBbl500;
};