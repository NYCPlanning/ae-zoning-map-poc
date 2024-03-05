import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import type { ZoningDistrictClass } from "../types/ZoningDistrictClass";


export function createZoningDistrictClass(override: NonNullable<Partial<ZoningDistrictClass>> = {}): NonNullable<ZoningDistrictClass> {
  
  return {
  ...{"id": faker.helpers.fromRegExp("/^[A-Z][0-9]+$/"),"category": createZoningDistrictClassCategory(),"description": faker.string.alpha(),"url": faker.string.alpha(),"color": faker.helpers.fromRegExp("/^#([A-Fa-f0-9]{8})$/")},
  ...override
};
}