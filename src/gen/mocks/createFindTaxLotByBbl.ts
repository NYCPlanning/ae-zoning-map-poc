import { faker } from "@faker-js/faker";
import { createTaxLot } from "./createTaxLot";
import { createError } from "./createError";
import type { FindTaxLotByBbl200, FindTaxLotByBbl400, FindTaxLotByBbl404, FindTaxLotByBbl500, FindTaxLotByBblPathParams, FindTaxLotByBblQueryResponse } from "../types/FindTaxLotByBbl";

export function createFindTaxLotByBblPathParams(override: NonNullable<Partial<FindTaxLotByBblPathParams>> = {}): NonNullable<FindTaxLotByBblPathParams> {
    return {
        ...{ "bbl": faker.helpers.fromRegExp("/^([0-9]{10})$/") },
        ...override
    };
}
/**
 * @description A tax lot object
 */

 export function createFindTaxLotByBbl200(override?: NonNullable<Partial<FindTaxLotByBbl200>>): NonNullable<FindTaxLotByBbl200> {
    return createTaxLot(override);
}

 export function createFindTaxLotByBbl400(override?: NonNullable<Partial<FindTaxLotByBbl400>>): NonNullable<FindTaxLotByBbl400> {
    return createError(override);
}

 export function createFindTaxLotByBbl404(override?: NonNullable<Partial<FindTaxLotByBbl404>>): NonNullable<FindTaxLotByBbl404> {
    return createError(override);
}

 export function createFindTaxLotByBbl500(override?: NonNullable<Partial<FindTaxLotByBbl500>>): NonNullable<FindTaxLotByBbl500> {
    return createError(override);
}
/**
 * @description A tax lot object
 */

 export function createFindTaxLotByBblQueryResponse(override?: NonNullable<Partial<FindTaxLotByBblQueryResponse>>): NonNullable<FindTaxLotByBblQueryResponse> {
    return createTaxLot(override);
}