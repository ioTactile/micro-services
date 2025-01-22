/*
  Warnings:

  - You are about to drop the column `parentId` on the `PostComment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_parentId_fkey";

-- DropIndex
DROP INDEX "PostComment_parentId_idx";

-- AlterTable
ALTER TABLE "PostComment" DROP COLUMN "parentId",
ADD COLUMN     "replyToId" TEXT;

-- CreateIndex
CREATE INDEX "PostComment_replyToId_idx" ON "PostComment"("replyToId");

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
