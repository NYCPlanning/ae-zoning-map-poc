import { createMultiPolygon } from "./createMultiPolygon";
import { createTaxLot } from "./createTaxLot";
import { faker } from "@faker-js/faker";
import type { TaxLotGeoJson } from "../types/TaxLotGeoJson";


export function createTaxLotGeoJson(override: NonNullable<Partial<TaxLotGeoJson>> = {}): NonNullable<TaxLotGeoJson> {
  
  return {
  ...{"id": faker.string.alpha(),"type": faker.helpers.arrayElement<any>([`Feature`]),"geometry": createMultiPolygon(),"properties": createTaxLot()},
  ...override
};
}