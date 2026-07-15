import type { LoginBody, RegisterBody } from "./auth.schema.js";

export async function registerService(data: RegisterBody) {
  if (data.username === "admin") {
    return null;
  }
}


export async function loginService(data: LoginBody) {
  const existingUser = data.username === "janray";
  if (existingUser) {
    throw new Error("User already exists");
  }

  return null
}