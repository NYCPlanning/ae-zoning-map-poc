import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type { FindZoningDistrictClassByZoningDistrictClassId200, FindZoningDistrictClassByZoningDistrictClassId400, FindZoningDistrictClassByZoningDistrictClassId404, FindZoningDistrictClassByZoningDistrictClassId500, FindZoningDistrictClassByZoningDistrictClassIdPathParams, FindZoningDistrictClassByZoningDistrictClassIdQueryResponse } from "../types/FindZoningDistrictClassByZoningDistrictClassId";

export function createFindZoningDistrictClassByZoningDistrictClassIdPathParams(override: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassIdPathParams>> = {}): NonNullable<FindZoningDistrictClassByZoningDistrictClassIdPathParams> {
    return {
        ...{ "id": faker.helpers.fromRegExp("/^[A-z][0-9]+$/") },
        ...override
    };
}
/**
 * @description A class schema for a zoning district
 */

 export function createFindZoningDistrictClassByZoningDistrictClassId200(override?: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassId200>>): NonNullable<FindZoningDistrictClassByZoningDistrictClassId200> {
    return createZoningDistrictClass(override);
}

 export function createFindZoningDistrictClassByZoningDistrictClassId400(override?: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassId400>>): NonNullable<FindZoningDistrictClassByZoningDistrictClassId400> {
    return createError(override);
}

 export function createFindZoningDistrictClassByZoningDistrictClassId404(override?: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassId404>>): NonNullable<FindZoningDistrictClassByZoningDistrictClassId404> {
    return createError(override);
}

 export function createFindZoningDistrictClassByZoningDistrictClassId500(override?: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassId500>>): NonNullable<FindZoningDistrictClassByZoningDistrictClassId500> {
    return createError(override);
}
/**
 * @description A class schema for a zoning district
 */

 export function createFindZoningDistrictClassByZoningDistrictClassIdQueryResponse(override?: NonNullable<Partial<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse>>): NonNullable<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse> {
    return createZoningDistrictClass(override);
}