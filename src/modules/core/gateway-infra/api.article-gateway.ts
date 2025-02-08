import { IArticleGateway } from "@/modules/core/gateway/article.gateway";
import { Article, ArticleComment, ArticleLike } from "@prisma/client";
import {
  CreateArticleDto,
  ExtendedArticle,
  UpdateArticleDto,
} from "@/modules/core/model/Article";

import { CreateArticleCommentDto } from "@/modules/core/model/ArticleComment";
import { axiosInstance } from "@/lib/globals";
import { CreateOrDeleteArticleLikeInputs } from "@/modules/react/sections/articles/_schemas/create-article-like";

export class ApiArticleGateway implements IArticleGateway {
  async getArticles(): Promise<ExtendedArticle[]> {
    const response = await axiosInstance.get<ExtendedArticle[]>("/api/blog");
    return response.data;
  }

  async getArticle(id: string): Promise<ExtendedArticle> {
    const response = await axiosInstance.get<ExtendedArticle>(
      `/api/blog/${id}`
    );
    return response.data;
  }

  async getArticleComments(id: string): Promise<ArticleComment[]> {
    const response = await axiosInstance.get<ArticleComment[]>(
      `/api/blog/${id}/comments`
    );
    return response.data;
  }

  async createArticle(article: CreateArticleDto): Promise<{
    message: string;
    article: Article;
  }> {
    const response = await axiosInstance.post("/api/blog", article);
    return response.data;
  }

  async updateArticle(article: UpdateArticleDto): Promise<{
    message: string;
    article: Article;
  }> {
    const response = await axiosInstance.patch("/api/blog", article);
    return response.data;
  }

  async deleteArticle(id: string): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/blog/${id}`);
    return response.data;
  }

  async createArticleComment(articleComment: CreateArticleCommentDto): Promise<{
    message: string;
    articleComment: ArticleComment;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${articleComment.articleId}/comment`,
      articleComment
    );
    return response.data;
  }

  async deleteArticleComment(
    articleId: string,
    articleCommentId: string
  ): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/blog/${articleId}/comment/${articleCommentId}`
    );
    return response.data;
  }

  async createArticleLike(
    articleLike: CreateOrDeleteArticleLikeInputs
  ): Promise<{
    message: string;
    articleLike: ArticleLike;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${articleLike.articleId}/like`,
      articleLike
    );
    return response.data;
  }

  async deleteArticleLike(
    articleLike: CreateOrDeleteArticleLikeInputs
  ): Promise<{
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
