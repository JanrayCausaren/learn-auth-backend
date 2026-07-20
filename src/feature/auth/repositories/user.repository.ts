import { prisma, type DbClient } from "../../../lib/prisma";
import type { RegisterBody } from "../auth.schema";

async function createUser(data: RegisterBody, db: DbClient = prisma) {
  return db.user.create({
    data,
  });
}

async function findByEmail(email: string, db: DbClient = prisma) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}
async function findById(id: string, db: DbClient = prisma) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

async function updateToVerifiedUser(userId: string, db: DbClient = prisma) {
  return db.user.update({
    data: {
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
    where: {
      id: userId,
    },
  });
}


async function updatePassword(
  newPassword: string,
  userId: string,
  db: DbClient = prisma,
) {
  return db.user.update({
    data: {
      password: newPassword,
      updatedAt: new Date(),
    },
    where: {
      id: userId,
    },
  });
}

export const userRepository = {
  findByEmail,
  createUser,
  findById,
  updateToVerifiedUser,
  updatePassword
};
