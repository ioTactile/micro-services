import { IArticleGateway } from "@/modules/core/gateway/article.gateway";
import {
  CreateArticleDto,
  CreateOrDeleteArticleLikeDto,
  DeleteArticleCommentDto,
  DeleteArticleDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  UpdateArticleDto,
} from "@/modules/core/model/Article";
import { CreateArticleCommentDto } from "@/modules/core/model/Article";
import { axiosInstance } from "@/lib/globals";

export class ApiArticleGateway implements IArticleGateway {
  async getArticles(): Promise<GetArticlesResponse> {
    const response = await axiosInstance.get<GetArticlesResponse>("/api/blog");
    return response.data;
  }

  async getArticleBySlug(slug: string): Promise<GetArticleResponse> {
    const response = await axiosInstance.get<GetArticleResponse>(
      `/api/blog/${slug}`
    );
    return response.data;
  }

  async getArticleById(id: string): Promise<GetArticleResponse> {
    const response = await axiosInstance.get<GetArticleResponse>(
      `/api/blog/${id}`
    );
    return response.data;
  }

  async getArticleComments(id: string): Promise<GetArticleCommentsResponse> {
    const response = await axiosInstance.get<GetArticleCommentsResponse>(
      `/api/blog/${id}/comments`
    );
    return response.data;
  }

  async createArticle(article: CreateArticleDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post("/api/blog", article);
    return response.data;
  }

  async updateArticle(article: UpdateArticleDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${article.id}`,
      article
    );
    return response.data;
  }

  async deleteArticle(article: DeleteArticleDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/blog/${article.id}`, {
      data: { id: article.id },
    });
    return response.data;
  }

  async createArticleComment(articleComment: CreateArticleCommentDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${articleComment.articleId}/comment`,
      articleComment
    );
    return response.data;
  }

  async deleteArticleComment(articleComment: DeleteArticleCommentDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/blog/${articleComment.articleId}/comment/${articleComment.articleCommentId}`,
      {
        data: articleComment,
      }
    );
    return response.data;
  }

  async createArticleLike(articleLike: CreateOrDeleteArticleLikeDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${articleLike.articleId}/like`,
      articleLike
    );
    return response.data;
  }

  async deleteArticleLike(articleLike: CreateOrDeleteArticleLikeDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/blog/${articleLike.articleId}/like`,
      {
        data: articleLike,
      }
    );
    return response.data;
  }
}

export const articleGateway = new ApiArticleGateway();
