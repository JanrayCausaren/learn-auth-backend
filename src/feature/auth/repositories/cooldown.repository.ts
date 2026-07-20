import type { CooldownType } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import type { CooldownData } from "../auth.model";

async function findCooldownTokenByUserIdAndTokenType(
  userId: string,
  tokenType: CooldownType,
) {
  return prisma.cooldown.findUnique({
    where: {
      userId_type: {
        type: tokenType,
        userId: userId,
      },
    },
  });
}

async function createOrUpdate(data: CooldownData) {
  return prisma.cooldown.upsert({
    create: data,
    update: {
      lastSentAt: data.lastSentAt,
    },
    where: {
      userId_type: {
        type: data.type,
        userId: data.userId,
      },
    },
  });
}

export const cooldownRepository = {
  findCooldownTokenByUserIdAndTokenType,
  createOrUpdate
};
