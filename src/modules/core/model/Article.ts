import {
  Article,
  ArticleComment,
  ArticleLike,
  ArticleTag,
  User,
} from "@prisma/client";
import { CreateArticleInputs } from "@/modules/react/sections/articles/_schemas/create-article";
import { UpdateArticleInputs } from "@/modules/react/sections/articles/_schemas/update-article";

export interface CreateArticleDto extends CreateArticleInputs {
  authorId: string;
}

export interface UpdateArticleDto extends UpdateArticleInputs {
  id: string;
}

export interface ExtendedArticles extends Article {
  author: User;
  _count: {
    articleComments: number;
    articleLikes: number;
  };
  articleTags: ArticleTag[];
}

export interface ExtendedArticle extends Article {
  author: User;
  articleTags: ArticleTag[];
  articleComments: ArticleComment[] & {
    replies: ArticleComment[] & {
      author: User;
      replyToUser: User;
    };
    author: User;
  };
  articleLikes: ArticleLike[];
}
