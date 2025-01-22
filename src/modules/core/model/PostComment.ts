import { PostComment, User } from "@prisma/client";
import { z } from "zod";

export const createPostCommentSchema = z.object({
  content: z.string().min(1).max(300),
});

export type CreatePostCommentFormData = z.infer<typeof createPostCommentSchema>;

export interface CreatePostCommentDto extends CreatePostCommentFormData {
  postId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
}

export interface ExtendedPostComment extends PostComment {
  author: User;
  replies?: Omit<ExtendedPostComment, "replies">[];
  replyToUser: User | null;
}
