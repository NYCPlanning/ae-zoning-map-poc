import { faker } from "@faker-js/faker";
import { createZoningDistrict } from "./createZoningDistrict";
import { createError } from "./createError";
import type { FindZoningDistrictsByTaxLotBbl200, FindZoningDistrictsByTaxLotBbl400, FindZoningDistrictsByTaxLotBbl404, FindZoningDistrictsByTaxLotBbl500, FindZoningDistrictsByTaxLotBblPathParams, FindZoningDistrictsByTaxLotBblQueryResponse } from "../types/FindZoningDistrictsByTaxLotBbl";

export function createFindZoningDistrictsByTaxLotBblPathParams(override: NonNullable<Partial<FindZoningDistrictsByTaxLotBblPathParams>> = {}): NonNullable<FindZoningDistrictsByTaxLotBblPathParams> {
    return {
        ...{ "bbl": faker.helpers.fromRegExp("/^([0-9]{10})$/") },
        ...override
    };
}
/**
 * @description An object containing zoning districts.
 */

 export function createFindZoningDistrictsByTaxLotBbl200(override: NonNullable<Partial<FindZoningDistrictsByTaxLotBbl200>> = {}): NonNullable<FindZoningDistrictsByTaxLotBbl200> {
    return {
        ...{ "zoningDistricts": faker.helpers.arrayElements([createZoningDistrict()]) as any },
        ...override
    };
}

 export function createFindZoningDistrictsByTaxLotBbl400(override?: NonNullable<Partial<FindZoningDistrictsByTaxLotBbl400>>): NonNullable<FindZoningDistrictsByTaxLotBbl400> {
    return createError(override);
}

 export function createFindZoningDistrictsByTaxLotBbl404(override?: NonNullable<Partial<FindZoningDistrictsByTaxLotBbl404>>): NonNullable<FindZoningDistrictsByTaxLotBbl404> {
    return createError(override);
}

 export function createFindZoningDistrictsByTaxLotBbl500(override?: NonNullable<Partial<FindZoningDistrictsByTaxLotBbl500>>): NonNullable<FindZoningDistrictsByTaxLotBbl500> {
    return createError(override);
}
/**
 * @description An object containing zoning districts.
 */

 export function createFindZoningDistrictsByTaxLotBblQueryResponse(override: NonNullable<Partial<FindZoningDistrictsByTaxLotBblQueryResponse>> = {}): NonNullable<FindZoningDistrictsByTaxLotBblQueryResponse> {
    return {
        ...{ "zoningDistricts": faker.helpers.arrayElements([createZoningDistrict()]) as any },
        ...override
    };
}