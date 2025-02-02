/*
  Warnings:

  - You are about to drop the column `postId` on the `TalkComment` table. All the data in the column will be lost.
  - Added the required column `talkId` to the `TalkComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TalkComment" DROP CONSTRAINT "TalkComment_postId_fkey";

-- DropIndex
DROP INDEX "TalkComment_postId_idx";

-- AlterTable
ALTER TABLE "TalkComment" DROP COLUMN "postId",
ADD COLUMN     "talkId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "TalkComment_talkId_idx" ON "TalkComment"("talkId");

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
