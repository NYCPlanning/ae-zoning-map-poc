import { faker } from "@faker-js/faker";
import type { Error } from "../types/Error";


export function createError(override: NonNullable<Partial<Error>> = {}): NonNullable<Error> {
  
  return {
  ...{"statusCode": faker.number.float({}),"message": faker.string.alpha(),"error": faker.string.alpha()},
  ...override
};
}