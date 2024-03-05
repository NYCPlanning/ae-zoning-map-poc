import { createError } from "./createError";
import type { InternalServerError } from "../types/InternalServerError";


export function createInternalServerError(override?: NonNullable<Partial<InternalServerError>>): NonNullable<InternalServerError> {
  
  return createError(override);
}