import { faker } from "@faker-js/faker";
import { createTaxLotGeoJson } from "./createTaxLotGeoJson";
import { createError } from "./createError";
import type { FindTaxLotGeoJsonByBbl200, FindTaxLotGeoJsonByBbl400, FindTaxLotGeoJsonByBbl404, FindTaxLotGeoJsonByBbl500, FindTaxLotGeoJsonByBblPathParams, FindTaxLotGeoJsonByBblQueryResponse } from "../types/FindTaxLotGeoJsonByBbl";

export function createFindTaxLotGeoJsonByBblPathParams(override: NonNullable<Partial<FindTaxLotGeoJsonByBblPathParams>> = {}): NonNullable<FindTaxLotGeoJsonByBblPathParams> {
    return {
        ...{ "bbl": faker.helpers.fromRegExp("/^([0-9]{10})$/") },
        ...override
    };
}
/**
 * @description A tax lot geojson object
 */

 export function createFindTaxLotGeoJsonByBbl200(override?: NonNullable<Partial<FindTaxLotGeoJsonByBbl200>>): NonNullable<FindTaxLotGeoJsonByBbl200> {
    return createTaxLotGeoJson(override);
}

 export function createFindTaxLotGeoJsonByBbl400(override?: NonNullable<Partial<FindTaxLotGeoJsonByBbl400>>): NonNullable<FindTaxLotGeoJsonByBbl400> {
    return createError(override);
}

 export function createFindTaxLotGeoJsonByBbl404(override?: NonNullable<Partial<FindTaxLotGeoJsonByBbl404>>): NonNullable<FindTaxLotGeoJsonByBbl404> {
    return createError(override);
}

 export function createFindTaxLotGeoJsonByBbl500(override?: NonNullable<Partial<FindTaxLotGeoJsonByBbl500>>): NonNullable<FindTaxLotGeoJsonByBbl500> {
    return createError(override);
}
/**
 * @description A tax lot geojson object
 */

 export function createFindTaxLotGeoJsonByBblQueryResponse(override?: NonNullable<Partial<FindTaxLotGeoJsonByBblQueryResponse>>): NonNullable<FindTaxLotGeoJsonByBblQueryResponse> {
    return createTaxLotGeoJson(override);
}