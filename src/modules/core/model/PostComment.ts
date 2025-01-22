import { PostComment } from "@prisma/client";
import { z } from "zod";

export const createPostCommentSchema = z.object({
  content: z.string().min(1).max(300),
});

export type CreatePostCommentFormData = z.infer<typeof createPostCommentSchema>;

export interface CreatePostCommentDto extends CreatePostCommentFormData {
  postId: string;
  authorId: string;
  replyToId: string | null;
}

export interface ExtendedPostComment extends PostComment {
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
  replies?: Omit<ExtendedPostComment, "replies">[];
}
