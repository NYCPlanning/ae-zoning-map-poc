import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type { FindZoningDistrictClasses200, FindZoningDistrictClasses400, FindZoningDistrictClasses500, FindZoningDistrictClassesQueryResponse } from "../types/FindZoningDistrictClasses";

/**
 * @description An object containing all zoning district class schemas.
 */

 export function createFindZoningDistrictClasses200(override: NonNullable<Partial<FindZoningDistrictClasses200>> = {}): NonNullable<FindZoningDistrictClasses200> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}

 export function createFindZoningDistrictClasses400(override?: NonNullable<Partial<FindZoningDistrictClasses400>>): NonNullable<FindZoningDistrictClasses400> {
    return createError(override);
}

 export function createFindZoningDistrictClasses500(override?: NonNullable<Partial<FindZoningDistrictClasses500>>): NonNullable<FindZoningDistrictClasses500> {
    return createError(override);
}
/**
 * @description An object containing all zoning district class schemas.
 */

 export function createFindZoningDistrictClassesQueryResponse(override: NonNullable<Partial<FindZoningDistrictClassesQueryResponse>> = {}): NonNullable<FindZoningDistrictClassesQueryResponse> {
    return {
        ...{ "zoningDistrictClasses": faker.helpers.arrayElements([createZoningDistrictClass()]) as any },
        ...override
    };
}