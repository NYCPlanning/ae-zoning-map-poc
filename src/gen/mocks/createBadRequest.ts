import { createError } from "./createError";
import type { BadRequest } from "../types/BadRequest";


export function createBadRequest(override?: NonNullable<Partial<BadRequest>>): NonNullable<BadRequest> {
  
  return createError(override);
}