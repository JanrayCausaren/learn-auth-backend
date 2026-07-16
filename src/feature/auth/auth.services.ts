import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/app.error.js";
import * as repository from "./auth.repository.js";
import type { LoginBody, RegisterBody } from "./auth.schema.js";
import bcrypt from "bcrypt";
// export async function registerService(data: RegisterBody) {
//   const result = await registerRepository(data);
//   return null;
// }

export async function registerService(data: RegisterBody) {
  //normalization / sanitize
  const email = data.email.trim().toLowerCase();
  // console.log(email);

  //find existing user
  const existingUser = await repository.findUserByEmail(email);

  if (existingUser) {
    throw new AppError({
      message: "User Already Existed",
      statusCode: 409,
    });
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(data.password, 12);
  data.password = hashedPassword;
  // console.log(data.password);

  return repository.registerRepository(data);
}

export async function loginService(data: LoginBody) {
  //normalization / sanitize
  const email = data.email.trim().toLowerCase();
  const existingUser = await repository.findUserByEmail(email);

  if (!existingUser) {
    throw new NotFoundError("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(data.password, existingUser.password);

  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // TODO:
  // Check if account is verified/active (optional)

  // TODO:
  // Generate JWT

  return existingUser;
}
