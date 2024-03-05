import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type { FindZoningDistrictClassesByTaxLotBbl200, FindZoningDistrictClassesByTaxLotBbl400, FindZoningDistrictClassesByTaxLotBbl404, FindZoningDistrictClassesByTaxLotBbl500, FindZoningDistrictClassesByTaxLotBblPathParams, FindZoningDistrictClassesByTaxLotBblQueryResponse } from "../types/FindZoningDistrictClassesByTaxLotBbl";

export function createFindZoningDistrictClassesByTaxLotBblPathParams(override: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBblPathParams>> = {}): NonNullable<FindZoningDistrictClassesByTaxLotBblPathParams> {
    return {
        ...{ "bbl": faker.helpers.fromRegExp("/^([0-9]{10})$/") },
        ...override
    };
}
/**
 * @description An object containing zoning district class schemas.
 */

 export function createFindZoningDistrictClassesByTaxLotBbl200(override: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBbl200>> = {}): NonNullable<FindZoningDistrictClassesByTaxLotBbl200> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}

 export function createFindZoningDistrictClassesByTaxLotBbl400(override?: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBbl400>>): NonNullable<FindZoningDistrictClassesByTaxLotBbl400> {
    return createError(override);
}

 export function createFindZoningDistrictClassesByTaxLotBbl404(override?: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBbl404>>): NonNullable<FindZoningDistrictClassesByTaxLotBbl404> {
    return createError(override);
}

 export function createFindZoningDistrictClassesByTaxLotBbl500(override?: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBbl500>>): NonNullable<FindZoningDistrictClassesByTaxLotBbl500> {
    return createError(override);
}
/**
 * @description An object containing zoning district class schemas.
 */

 export function createFindZoningDistrictClassesByTaxLotBblQueryResponse(override: NonNullable<Partial<FindZoningDistrictClassesByTaxLotBblQueryResponse>> = {}): NonNullable<FindZoningDistrictClassesByTaxLotBblQueryResponse> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}