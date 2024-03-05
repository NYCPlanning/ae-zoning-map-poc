import { faker } from "@faker-js/faker";
import { createZoningDistrict } from "./createZoningDistrict";
import { createError } from "./createError";
import type { FindZoningDistrictByZoningDistrictId200, FindZoningDistrictByZoningDistrictId400, FindZoningDistrictByZoningDistrictId404, FindZoningDistrictByZoningDistrictId500, FindZoningDistrictByZoningDistrictIdPathParams, FindZoningDistrictByZoningDistrictIdQueryResponse } from "../types/FindZoningDistrictByZoningDistrictId";

export function createFindZoningDistrictByZoningDistrictIdPathParams(override: NonNullable<Partial<FindZoningDistrictByZoningDistrictIdPathParams>> = {}): NonNullable<FindZoningDistrictByZoningDistrictIdPathParams> {
    return {
        ...{ "id": faker.string.uuid() },
        ...override
    };
}
/**
 * @description A zoning district object
 */

 export function createFindZoningDistrictByZoningDistrictId200(override?: NonNullable<Partial<FindZoningDistrictByZoningDistrictId200>>): NonNullable<FindZoningDistrictByZoningDistrictId200> {
    return createZoningDistrict(override);
}

 export function createFindZoningDistrictByZoningDistrictId400(override?: NonNullable<Partial<FindZoningDistrictByZoningDistrictId400>>): NonNullable<FindZoningDistrictByZoningDistrictId400> {
    return createError(override);
}

 export function createFindZoningDistrictByZoningDistrictId404(override?: NonNullable<Partial<FindZoningDistrictByZoningDistrictId404>>): NonNullable<FindZoningDistrictByZoningDistrictId404> {
    return createError(override);
}

 export function createFindZoningDistrictByZoningDistrictId500(override?: NonNullable<Partial<FindZoningDistrictByZoningDistrictId500>>): NonNullable<FindZoningDistrictByZoningDistrictId500> {
    return createError(override);
}
/**
 * @description A zoning district object
 */

 export function createFindZoningDistrictByZoningDistrictIdQueryResponse(override?: NonNullable<Partial<FindZoningDistrictByZoningDistrictIdQueryResponse>>): NonNullable<FindZoningDistrictByZoningDistrictIdQueryResponse> {
    return createZoningDistrict(override);
}