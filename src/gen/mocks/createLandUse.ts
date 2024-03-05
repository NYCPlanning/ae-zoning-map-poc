import { faker } from "@faker-js/faker";
import type { LandUse } from "../types/LandUse";


export function createLandUse(override: NonNullable<Partial<LandUse>> = {}): NonNullable<LandUse> {
  
  return {
  ...{"id": faker.string.alpha(),"description": faker.string.alpha(),"color": faker.helpers.fromRegExp("/^#([A-Fa-f0-9]{8})$/")},
  ...override
};
}