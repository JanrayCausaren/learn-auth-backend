import { prisma } from "../../lib/prisma";
import type { RegisterBody } from "./auth.schema";

export async function registerRepository(data: RegisterBody) {
  return prisma.user.create({
    data,
  });
}
