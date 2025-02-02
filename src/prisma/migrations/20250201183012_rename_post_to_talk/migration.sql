/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_replyToId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_replyToUserId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostComment";

-- CreateTable
CREATE TABLE "TalkComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "replyToId" TEXT,
    "replyToUserId" TEXT,

    CONSTRAINT "TalkComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talk" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TalkComment_postId_idx" ON "TalkComment"("postId");

-- CreateIndex
CREATE INDEX "TalkComment_authorId_idx" ON "TalkComment"("authorId");

-- CreateIndex
CREATE INDEX "TalkComment_replyToId_idx" ON "TalkComment"("replyToId");

-- CreateIndex
CREATE INDEX "TalkComment_replyToUserId_idx" ON "TalkComment"("replyToUserId");

-- CreateIndex
CREATE INDEX "Talk_authorId_idx" ON "Talk"("authorId");

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Talk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "TalkComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkComment" ADD CONSTRAINT "TalkComment_replyToUserId_fkey" FOREIGN KEY ("replyToUserId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
