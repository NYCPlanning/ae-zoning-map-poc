import { faker } from "@faker-js/faker";
import { createZoningDistrictClassCategoryColor } from "./createZoningDistrictClassCategoryColor";
import { createError } from "./createError";
import type { FindZoningDistrictClassCategoryColors200, FindZoningDistrictClassCategoryColors400, FindZoningDistrictClassCategoryColors500, FindZoningDistrictClassCategoryColorsQueryResponse } from "../types/FindZoningDistrictClassCategoryColors";

/**
 * @description An object containing all zoning district category colors.
 */

 export function createFindZoningDistrictClassCategoryColors200(override: NonNullable<Partial<FindZoningDistrictClassCategoryColors200>> = {}): NonNullable<FindZoningDistrictClassCategoryColors200> {
    return {
        ...{ "zoningDistrictClassCategoryColors": faker.helpers.arrayElements([createZoningDistrictClassCategoryColor()]) as any },
        ...override
    };
}

 export function createFindZoningDistrictClassCategoryColors400(override?: NonNullable<Partial<FindZoningDistrictClassCategoryColors400>>): NonNullable<FindZoningDistrictClassCategoryColors400> {
    return createError(override);
}

 export function createFindZoningDistrictClassCategoryColors500(override?: NonNullable<Partial<FindZoningDistrictClassCategoryColors500>>): NonNullable<FindZoningDistrictClassCategoryColors500> {
    return createError(override);
}
/**
 * @description An object containing all zoning district category colors.
 */

 export function createFindZoningDistrictClassCategoryColorsQueryResponse(override: NonNullable<Partial<FindZoningDistrictClassCategoryColorsQueryResponse>> = {}): NonNullable<FindZoningDistrictClassCategoryColorsQueryResponse> {
    return {
        ...{ "zoningDistrictClassCategoryColors": faker.helpers.arrayElements([createZoningDistrictClassCategoryColor()]) as any },
        ...override
    };
}