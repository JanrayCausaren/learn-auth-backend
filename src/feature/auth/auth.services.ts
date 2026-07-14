import type { RegisterBody } from "./auth.schema.js";

export async function registerService(data: RegisterBody) {
  if (data.username === "admin") {
    return null;
  }
}
