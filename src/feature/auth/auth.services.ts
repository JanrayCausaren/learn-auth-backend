import { registerRepository } from "./auth.repository.js";
import type { LoginBody, RegisterBody } from "./auth.schema.js";

// export async function registerService(data: RegisterBody) {
//   const result = await registerRepository(data);

//   return null;
// }
export async function registerService(data: RegisterBody) {
  return registerRepository(data);
}

export async function loginService(data: LoginBody) {
  const existingUser = data.username === "janray";
  if (existingUser) {
    throw new Error("User already exists");
  }

  return null;
}
