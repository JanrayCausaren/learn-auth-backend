import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/app.error.js";
import { generateVerificationToken, hashToken } from "../../utils/token.js";
import * as repository from "./auth.repository.js";
import type { LoginBody, RegisterBody } from "./auth.schema.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./email.service.js";
import type { User } from "./auth.model.js";
import { CooldownType } from "../../../generated/prisma/enums.js";

// Signup - creating an account
export async function registerService(data: RegisterBody) {
  //normalization / sanitize
  const email = data.email.trim().toLowerCase();
  // console.log(email);

  //find existing user
  const existingUser = await repository.findUserByEmail(email);

  if (existingUser) {
    return await resendVerificationService(email);
  }
  // hashed password
  const hashedPassword = await bcrypt.hash(data.password, 12);
  data.password = hashedPassword;
  // console.log(data.password);

  const user = await repository.registerRepository({
    ...data,
    email,
    password: hashedPassword,
  });

  await generateTokenAndSendVerificationEmail(user);

  const { password, ...returnData } = user;

  return returnData;
}

export async function loginService(data: LoginBody) {
  //normalization / sanitize
  const email = data.email.trim().toLowerCase();
  const existingUser = await repository.findUserByEmail(email);

  if (!existingUser) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(data.password, existingUser.password);

  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (!existingUser.isEmailVerified) {
    throw new AppError({
      message: "Please verify your email.",
      statusCode: 403,
    });
  }

  const { password, ...user } = existingUser;

  // TODO:
  // Check if account is verified/active (optional)

  // TODO:
  // Generate JWT

  return user;
}

const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
async function generateTokenAndSendVerificationEmail(user: User) {
  // for email verification
  // Generate verification token
  const token = generateVerificationToken();
  console.log(token);

  // Hash the token before storing it
  const hashedToken = hashToken(token);
  console.log(hashedToken);

  // Save the verification token
  await repository.createVerificationToken({
    token: hashedToken,
    expiresAt: expiresAt,
    userId: user.id,
  });
  // send vefication email through email
  await sendVerificationEmail(user.email, token);

  // store  timestamp for the email verification for cooldown purposes
  await repository.upsertCooldown({
    userId: user.id,
    type: "EMAIL_VERIFICATION",
    lastSentAt: new Date(),
  });
}

export async function verifyEmailService(token: string) {
  const hashedToken = hashToken(token);

  const storedToken = await repository.findVerificationToken(hashedToken);

  //invalid token no token found
  if (!storedToken) {
    throw new AppError({
      statusCode: 400,
      message: "Invalid Verification Token",
    });
  }

  // check if the token is expired
  if (storedToken.expiresAt < new Date()) {
    throw new AppError({
      statusCode: 400,
      message: "Verification token has expired.",
    });
  }

  //update
  await repository.updateToVerifiedUser(storedToken.userId);

  //delete verification token
  await repository.deleteVerificationToken(storedToken.id);

  const user = await repository.findUserById(storedToken.userId);
  const { password, ...data } = user!;

  return data;
}

export async function resendVerificationService(email: string) {
  const normalizeEmail = email.trim().toLowerCase();

  const user = await repository.findUserByEmail(normalizeEmail);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (user.isEmailVerified) {
    throw new AppError({
      message: "User Already Existed",
      statusCode: 409,
    });
  }

  const cooldown = await repository.findCooldownByUserAndType(
    user.id,
    CooldownType.EMAIL_VERIFICATION,
  );
  const COOLDOWN_MS = 1000 * 60; // 60 SECONDS

  if (cooldown) {
    const diff = Date.now() - cooldown.lastSentAt.getTime();

    if (diff < COOLDOWN_MS){
       const remainingSeconds = Math.ceil((COOLDOWN_MS - diff) / 1000);

      throw new AppError({
        statusCode: 429,
        message: `Please wait ${remainingSeconds} seconds before requesting another verification email.`,
      });
    }
  }

  await repository.deleteVerificationTokensByUserId(user.id);
  await generateTokenAndSendVerificationEmail(user);

  // return user;
}
