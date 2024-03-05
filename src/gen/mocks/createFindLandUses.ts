import { faker } from "@faker-js/faker";
import { createLandUse } from "./createLandUse";
import { createError } from "./createError";
import type { FindLandUses200, FindLandUses400, FindLandUses500, FindLandUsesQueryResponse } from "../types/FindLandUses";

/**
 * @description An object containing all land uses.
 */

 export function createFindLandUses200(override: NonNullable<Partial<FindLandUses200>> = {}): NonNullable<FindLandUses200> {
    return {
        ...{ "landUses": faker.helpers.arrayElements([createLandUse()]) as any },
        ...override
    };
}

 export function createFindLandUses400(override?: NonNullable<Partial<FindLandUses400>>): NonNullable<FindLandUses400> {
    return createError(override);
}

 export function createFindLandUses500(override?: NonNullable<Partial<FindLandUses500>>): NonNullable<FindLandUses500> {
    return createError(override);
}
/**
 * @description An object containing all land uses.
 */

 export function createFindLandUsesQueryResponse(override: NonNullable<Partial<FindLandUsesQueryResponse>> = {}): NonNullable<FindLandUsesQueryResponse> {
    return {
        ...{ "landUses": faker.helpers.arrayElements([createLandUse()]) as any },
        ...override
    };
}