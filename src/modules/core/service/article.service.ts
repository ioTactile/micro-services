import { IArticleRepository } from "@/modules/core/repository/article.repository";
import {
  CreateArticleCommentDto,
  CreateArticleDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  UpdateArticleDto,
} from "@/modules/core/model/Article";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async getArticles(): Promise<GetArticlesResponse> {
    return await this.articleRepository.findMany();
  }

  async getArticleById(id: string): Promise<GetArticleResponse | null> {
    return await this.articleRepository.findById(id);
  }

  async createArticle(data: CreateArticleDto): Promise<void> {
    return await this.articleRepository.create(data);
  }

  async updateArticle(data: UpdateArticleDto): Promise<void> {
    return await this.articleRepository.update(data);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async getArticleComments(
    articleId: string
  ): Promise<GetArticleCommentsResponse> {
    return await this.articleRepository.getArticleComments(articleId);
  }

  async createArticleComment(data: CreateArticleCommentDto): Promise<void> {
    return await this.articleRepository.createArticleComment(data);
  }

  async deleteArticleComment(id: string): Promise<void> {
    return await this.articleRepository.deleteArticleComment(id);
  }

  async likeArticle(articleId: string, userId: string): Promise<void> {
    await this.articleRepository.like(articleId, userId);
  }

  async unlikeArticle(articleId: string, userId: string): Promise<void> {
    await this.articleRepository.unlike(articleId, userId);
  }
}
