import { createPosition } from "./createPosition";
import { faker } from "@faker-js/faker";
import type { MultiPolygon } from "../types/MultiPolygon";


export function createMultiPolygon(override: NonNullable<Partial<MultiPolygon>> = {}): NonNullable<MultiPolygon> {
  
  return {
  ...{"type": faker.helpers.arrayElement<any>([`MultiPolygon`]),"coordinates": faker.helpers.arrayElements([faker.helpers.arrayElements([faker.helpers.arrayElements([createPosition()]) as any]) as any]) as any},
  ...override
};
}