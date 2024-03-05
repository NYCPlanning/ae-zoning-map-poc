import { faker } from "@faker-js/faker";
import type { ZoningDistrictClassCategory } from "../types/ZoningDistrictClassCategory";


export function createZoningDistrictClassCategory(override?: NonNullable<Partial<ZoningDistrictClassCategory>>): NonNullable<ZoningDistrictClassCategory> {
  
  return faker.helpers.arrayElement<any>([`Residential`, `Commercial`, `Manufacturing`]);
}