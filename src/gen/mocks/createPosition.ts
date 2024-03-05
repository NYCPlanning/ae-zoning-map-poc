import { faker } from "@faker-js/faker";
import type { Position } from "../types/Position";


export function createPosition(override: NonNullable<Partial<Position>> = []): NonNullable<Position> {
  
  return [
      ...faker.helpers.arrayElements([faker.number.float({})]) as any,
      ...override
    ];
}