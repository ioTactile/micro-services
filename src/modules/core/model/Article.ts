import { Article, ArticleComment, ArticleTag, User } from "@prisma/client";
import { CreateArticleInputs } from "@/modules/react/sections/articles/_schemas/create-article";
import { UpdateArticleInputs } from "@/modules/react/sections/articles/_schemas/update-article";
import { CreateArticleCommentInputs } from "@/modules/react/sections/articles/_schemas/create-article-comment";
import { CreateOrDeleteArticleLikeInputs } from "@/modules/react/sections/articles/_schemas/create-article-like";
import { DeleteArticleCommentInputs } from "@/modules/react/sections/articles/_schemas/delete-article-comment";

// Create Article
export type CreateArticleDto = {
  authorId: string;
} & CreateArticleInputs;

// Update Article

export type UpdateArticleDto = {
  id: string;
  updatedAt: Date;
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

export type CreateArticleCommentDto = {
  articleId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
} & CreateArticleCommentInputs;

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

// Delete Article Comment

export type DeleteArticleCommentDto = DeleteArticleCommentInputs;

// Create/Delete Article Like

export type CreateOrDeleteArticleLikeDto = CreateOrDeleteArticleLikeInputs;
