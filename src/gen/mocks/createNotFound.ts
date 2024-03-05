import { createError } from "./createError";
import type { NotFound } from "../types/NotFound";


export function createNotFound(override?: NonNullable<Partial<NotFound>>): NonNullable<NotFound> {
  
  return createError(override);
}