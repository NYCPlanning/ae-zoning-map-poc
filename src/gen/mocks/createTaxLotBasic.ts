import { faker } from "@faker-js/faker";
import type { TaxLotBasic } from "../types/TaxLotBasic";


export function createTaxLotBasic(override: NonNullable<Partial<TaxLotBasic>> = {}): NonNullable<TaxLotBasic> {
  
  return {
  ...{"bbl": faker.helpers.fromRegExp("/^([0-9]{10})$/"),"boroughId": faker.helpers.fromRegExp("/\\b[1-9]\\b/"),"block": faker.string.alpha(),"lot": faker.string.alpha(),"address": faker.string.alpha(),"landUseId": faker.string.alpha()},
  ...override
};
}