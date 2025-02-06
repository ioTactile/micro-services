import { IArticleGateway } from "@/modules/core/gateway/article.gateway";
import { Article, ArticleComment, ArticleLike } from "@prisma/client";
import {
  CreateArticleDto,
  ExtendedArticle,
} from "@/modules/core/model/Article";

import { CreateArticleCommentDto } from "@/modules/core/model/ArticleComment";
import { axiosInstance } from "@/lib/globals";
import { CreateOrDeleteArticleLikeInputs } from "@/modules/react/sections/articles/_schemas/create-article-like";

export class ApiArticleGateway implements IArticleGateway {
  async getArticles(): Promise<ExtendedArticle[]> {
    const response = await axiosInstance.get<ExtendedArticle[]>("/api/article");
    return response.data;
  }

  async getArticle(id: string): Promise<ExtendedArticle> {
    const response = await axiosInstance.get<ExtendedArticle>(
      `/api/article/${id}`
    );
    return response.data;
  }

  async getArticleComments(id: string): Promise<ArticleComment[]> {
    const response = await axiosInstance.get<ArticleComment[]>(
      `/api/article/${id}/comments`
    );
    return response.data;
  }

  async createArticle(article: CreateArticleDto): Promise<Article> {
    const response = await axiosInstance.patch("/api/article", article);
    return response.data;
  }

  async createArticleComment(articleComment: CreateArticleCommentDto): Promise<{
    message: string;
    articleComment: ArticleComment;
  }> {
    const response = await axiosInstance.patch(
      `/api/article/${articleComment.articleId}/comment`,
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
      `/api/article/${articleId}/comment/${articleCommentId}`
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
      `/api/article/${articleLike.articleId}/like`,
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
      `/api/article/${articleLike.articleId}/like`,
      {
        data: articleLike,
      }
    );
    return response.data;
  }
}

export const articleGateway = new ApiArticleGateway();
