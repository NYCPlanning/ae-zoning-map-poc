import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import type { ZoningDistrictClassCategoryColor } from "../types/ZoningDistrictClassCategoryColor";


export function createZoningDistrictClassCategoryColor(override: NonNullable<Partial<ZoningDistrictClassCategoryColor>> = {}): NonNullable<ZoningDistrictClassCategoryColor> {
  
  return {
  ...{"category": createZoningDistrictClassCategory(),"color": faker.helpers.fromRegExp("/^#([A-Fa-f0-9]{8})$/")},
  ...override
};
}