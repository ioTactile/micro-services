import { Article, ArticleComment, ArticleTag, User } from "@prisma/client";
import { CreateArticleInputs } from "@/modules/react/sections/articles/_schemas/create-article";
import { UpdateArticleInputs } from "@/modules/react/sections/articles/_schemas/update-article";
import { CreateArticleCommentInputs } from "@/modules/react/sections/articles/_schemas/create-article-comment";

// Create Article
export type CreateArticleDto = {
  authorId: string;
} & CreateArticleInputs;

// Update Article

export type UpdateArticleDto = {
  id: string;
} & UpdateArticleInputs;

// Many Articles

type ArticleWithRelations = {
  author: User;
  articleTags: ArticleTag[];
  _count: {
    articleComments: number;
    articleLikes: number;
  };
} & Article;

export type GetArticlesResponse = ArticleWithRelations[];

// One Article

export type GetArticleResponse = ArticleWithRelations;

// Create Article Comment

export interface CreateArticleCommentDto extends CreateArticleCommentInputs {
  articleId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
}

// Article Comments

type ArticleCommentWithRelations = {
  author: User;
  replies?: (Omit<ArticleComment, "replies"> & {
    author: User;
    replyToUser: User | null;
  })[];
  replyToUser: User | null;
} & ArticleComment;

export type GetArticleCommentsResponse = ArticleCommentWithRelations[];
