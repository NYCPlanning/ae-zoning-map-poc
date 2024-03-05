import { faker } from "@faker-js/faker";
import type { Page } from "../types/Page";


export function createPage(override: NonNullable<Partial<Page>> = {}): NonNullable<Page> {
  
  return {
  ...{"limit": faker.number.float({"min":1,"max":100}),"offset": faker.number.float({"min":0}),"total": faker.number.float({"min":0}),"order": faker.string.alpha()},
  ...override
};
}