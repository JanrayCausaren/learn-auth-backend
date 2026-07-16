import { AppError } from "../../utils/app.error.js";
import * as repository from "./auth.repository.js";
import type { LoginBody, RegisterBody } from "./auth.schema.js";

// export async function registerService(data: RegisterBody) {
//   const result = await registerRepository(data);
//   return null;
// }

export async function registerService(data: RegisterBody) {

  //normalization
  const email = data.email = data.email.trim().toLowerCase();

  //find existing user
  const existingUser = await repository.findUserByEmail(email);

  if (existingUser) {
     throw new AppError({
      message: "User Already Existed", 
      statusCode: 409, 
     });
  }

  return repository.registerRepository(data);
}

export async function loginService(data: LoginBody) {
  const existingUser = data.username === "janray";
  if (existingUser) {
    throw new Error("User already exists");
  }

  return null;
}
