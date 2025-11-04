-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "passwordResetExp" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
