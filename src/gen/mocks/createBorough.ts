import { faker } from "@faker-js/faker";
import type { Borough } from "../types/Borough";


export function createBorough(override: NonNullable<Partial<Borough>> = {}): NonNullable<Borough> {
  
  return {
  ...{"id": faker.helpers.fromRegExp("/\\b[1-9]\\b/"),"title": faker.string.alpha(),"abbr": faker.string.alpha()},
  ...override
};
}