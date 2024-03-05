import { faker } from "@faker-js/faker";
import { createBorough } from "./createBorough";
import { createError } from "./createError";
import type { FindBoroughs200, FindBoroughs400, FindBoroughs500, FindBoroughsQueryResponse } from "../types/FindBoroughs";

/**
 * @description An object containing all boroughs.
 */

 export function createFindBoroughs200(override: NonNullable<Partial<FindBoroughs200>> = {}): NonNullable<FindBoroughs200> {
    return {
        ...{ "boroughs": faker.helpers.arrayElements([createBorough()]) as any },
        ...override
    };
}

 export function createFindBoroughs400(override?: NonNullable<Partial<FindBoroughs400>>): NonNullable<FindBoroughs400> {
    return createError(override);
}

 export function createFindBoroughs500(override?: NonNullable<Partial<FindBoroughs500>>): NonNullable<FindBoroughs500> {
    return createError(override);
}
/**
 * @description An object containing all boroughs.
 */

 export function createFindBoroughsQueryResponse(override: NonNullable<Partial<FindBoroughsQueryResponse>> = {}): NonNullable<FindBoroughsQueryResponse> {
    return {
        ...{ "boroughs": faker.helpers.arrayElements([createBorough()]) as any },
        ...override
    };
}