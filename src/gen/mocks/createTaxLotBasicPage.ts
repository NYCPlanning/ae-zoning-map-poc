import { createPage } from "./createPage";
import { createTaxLotBasic } from "./createTaxLotBasic";
import { faker } from "@faker-js/faker";
import type { TaxLotBasicPage } from "../types/TaxLotBasicPage";


export function createTaxLotBasicPage(override?: NonNullable<Partial<TaxLotBasicPage>>): NonNullable<TaxLotBasicPage> {
  
  return Object.assign({},createPage(),{"taxLots": faker.helpers.arrayElements([createTaxLotBasic()]) as any});
}