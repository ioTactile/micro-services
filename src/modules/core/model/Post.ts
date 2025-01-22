import { Post, PostComment, User } from "@prisma/client";
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().nullable(),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export interface CreatePostDto extends CreatePostFormData {
  authorId: string;
}

export interface ExtendedPost extends Post {
  author: User;
  comments: PostComment[];
}
