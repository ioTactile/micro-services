import { Article, ArticleComment, ArticleLike } from "@prisma/client";
import {
  CreateArticleDto,
  UpdateArticleDto,
} from "@/modules/core/model/Article";
import { CreateArticleCommentDto } from "@/modules/core/model/ArticleComment";
import { CreateOrDeleteArticleLikeInputs } from "@/modules/react/sections/articles/_schemas/create-article-like";

export interface IArticleGateway {
  getArticles: () => Promise<Article[]>;
  createArticle: (article: CreateArticleDto) => Promise<{
    message: string;
    article: Article;
  }>;
  getArticle: (id: string) => Promise<Article>;
  updateArticle: (article: UpdateArticleDto) => Promise<{
    message: string;
    article: Article;
  }>;

  deleteArticle: (id: string) => Promise<{
    message: string;
  }>;

  getArticleComments: (id: string) => Promise<ArticleComment[]>;
  createArticleComment: (articleComment: CreateArticleCommentDto) => Promise<{
    message: string;
    articleComment: ArticleComment;
  }>;

  deleteArticleComment: (
    articleId: string,
    articleCommentId: string
  ) => Promise<{
    message: string;
  }>;

  createArticleLike: (articleLike: CreateOrDeleteArticleLikeInputs) => Promise<{
    message: string;
    articleLike: ArticleLike;
  }>;
  deleteArticleLike: (articleLike: CreateOrDeleteArticleLikeInputs) => Promise<{
    message: string;
  }>;
}
