import { prisma } from "../../lib/prisma";
import type { CreateVerificationTokenType } from "./auth.model";
import type { RegisterBody } from "./auth.schema";

export async function registerRepository(data: RegisterBody) {
  return prisma.user.create({
    data,
    select: {
      id: true, 
      username: true, 
      email: true, 
      createdAt: true,
      updatedAt: true, 
    }
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}


export async function createVerificationToken(data: CreateVerificationTokenType) {
  return prisma.verificationToken.create({
    data,
  });
}