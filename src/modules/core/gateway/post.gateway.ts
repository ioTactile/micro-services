import { Post } from "@prisma/client";
import { CreatePostDto, ExtendedPost } from "@mm/modules/core/model/Post";
import {
  CreatePostCommentDto,
  ExtendedPostComment,
} from "@mm/modules/core/model/PostComment";

export interface IPostGateway {
  getPosts: () => Promise<Post[]>;
  createPost: (post: CreatePostDto) => Promise<Post>;
  getPost: (id: string) => Promise<ExtendedPost>;
  getPostComments: (postId: string) => Promise<ExtendedPostComment[]>;
  createPostComment: (postComment: CreatePostCommentDto) => Promise<void>;
}
