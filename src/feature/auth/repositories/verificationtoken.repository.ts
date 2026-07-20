import type { VerificationTokenType } from "../../../../generated/prisma/enums";
import { prisma, type DbClient } from "../../../lib/prisma";
import type { CreateVerificationTokenType } from "../auth.model";

async function insertVerificationToken(
  data: CreateVerificationTokenType,
  db: DbClient = prisma,
) {
  return db.verificationToken.create({
    data,
  });
}

// async function updateVerificationToken(data: CreateVerificationTokenType) {
//   return db.verificationToken.update({
//     data: {
//         expiresAt: data.expiresAt
//     },
//     where: {
//         userId_tokenType: {
//             userId: data.userId,
//             tokenType: data.tokenType
//         }
//     }
//   });
// }

async function findTokenByUserIdAndType(
  userId: string,
  tokenType: VerificationTokenType,
  db: DbClient = prisma,
) {
  return db.verificationToken.findUnique({
    where: {
      userId_tokenType: {
        tokenType: tokenType,
        userId: userId,
      },
    },
  });
}
async function findTokenByTokenAndType(
  token: string,
  tokenType: VerificationTokenType,
  db: DbClient = prisma,
) {
  return db.verificationToken.findUnique({
    where: {
      token: token,
      tokenType: tokenType,
    },
  });
}

async function deleteVerificationTokenByTokenId(tokenId: string, db: DbClient = prisma) {
  return db.verificationToken.delete({
    where: {
      id: tokenId,
    },
  });
}
async function deleteVerificationTokenByUserIdAndType(userId: string, tokenType : VerificationTokenType, db: DbClient = prisma) {
  return db.verificationToken.delete({
    where: {
      userId_tokenType: {
        userId: userId, 
        tokenType
      }
    },
  });
}

export const verificationTokenRepository = {
  insertVerificationToken,
  //   updateVerificationToken,
  findTokenByUserIdAndType,
  findTokenByTokenAndType,
  deleteVerificationTokenByTokenId,
  deleteVerificationTokenByUserIdAndType
};
