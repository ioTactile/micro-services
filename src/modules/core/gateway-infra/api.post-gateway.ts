import { IPostGateway } from "@mm/modules/core/gateway/post.gateway";
import { Post } from "@prisma/client";
import { CreatePostDto, ExtendedPost } from "@mm/modules/core/model/Post";
import {
  CreatePostCommentDto,
  ExtendedPostComment,
} from "@mm/modules/core/model/PostComment";
import { axiosInstance } from "@mm/lib/globals";

export class ApiPostGateway implements IPostGateway {
  async getPosts(): Promise<ExtendedPost[]> {
    const response = await axiosInstance.get<ExtendedPost[]>("/api/post");
    return response.data;
  }

  async getPost(id: string): Promise<ExtendedPost> {
    const response = await axiosInstance.get<ExtendedPost>(`/api/post/${id}`);
    return response.data;
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const response = await axiosInstance.patch("/api/post/create", post);
    return response.data;
  }

  async getPostComments(postId: string): Promise<ExtendedPostComment[]> {
    const response = await axiosInstance.get<ExtendedPostComment[]>(
      `/api/post/${postId}/comment`
    );
    return response.data;
  }

  async createPostComment(postComment: CreatePostCommentDto): Promise<void> {
    await axiosInstance.patch(
      `/api/post/${postComment.postId}/comment`,
      postComment
    );
  }
}

export const postGateway = new ApiPostGateway();
