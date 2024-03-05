import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type { FindZoningDistrictClassesByZoningDistrictId200, FindZoningDistrictClassesByZoningDistrictId400, FindZoningDistrictClassesByZoningDistrictId404, FindZoningDistrictClassesByZoningDistrictId500, FindZoningDistrictClassesByZoningDistrictIdPathParams, FindZoningDistrictClassesByZoningDistrictIdQueryResponse } from "../types/FindZoningDistrictClassesByZoningDistrictId";

export function createFindZoningDistrictClassesByZoningDistrictIdPathParams(override: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictIdPathParams>> = {}): NonNullable<FindZoningDistrictClassesByZoningDistrictIdPathParams> {
    return {
        ...{ "id": faker.string.uuid() },
        ...override
    };
}
/**
 * @description An object of class schemas for the zoning district.
 */

 export function createFindZoningDistrictClassesByZoningDistrictId200(override: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictId200>> = {}): NonNullable<FindZoningDistrictClassesByZoningDistrictId200> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}

 export function createFindZoningDistrictClassesByZoningDistrictId400(override?: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictId400>>): NonNullable<FindZoningDistrictClassesByZoningDistrictId400> {
    return createError(override);
}

 export function createFindZoningDistrictClassesByZoningDistrictId404(override?: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictId404>>): NonNullable<FindZoningDistrictClassesByZoningDistrictId404> {
    return createError(override);
}

 export function createFindZoningDistrictClassesByZoningDistrictId500(override?: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictId500>>): NonNullable<FindZoningDistrictClassesByZoningDistrictId500> {
    return createError(override);
}
/**
 * @description An object of class schemas for the zoning district.
 */

 export function createFindZoningDistrictClassesByZoningDistrictIdQueryResponse(override: NonNullable<Partial<FindZoningDistrictClassesByZoningDistrictIdQueryResponse>> = {}): NonNullable<FindZoningDistrictClassesByZoningDistrictIdQueryResponse> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}