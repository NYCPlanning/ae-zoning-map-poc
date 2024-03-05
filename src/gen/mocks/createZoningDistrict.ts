import { faker } from "@faker-js/faker";
import type { ZoningDistrict } from "../types/ZoningDistrict";


export function createZoningDistrict(override: NonNullable<Partial<ZoningDistrict>> = {}): NonNullable<ZoningDistrict> {
  
  return {
  ...{"id": faker.string.uuid(),"label": faker.string.alpha()},
  ...override
};
}