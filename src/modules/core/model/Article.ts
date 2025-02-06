import { Article, ArticleTag, User } from "@prisma/client";
import { CreateArticleInputs } from "@/modules/react/sections/articles/_schemas/create-article";

export interface CreateArticleDto extends CreateArticleInputs {
  authorId: string;
}

export interface ExtendedArticle extends Article {
  author: User;
  _count: {
    articleComments: number;
    articleLikes: number;
  };
  articleTags: ArticleTag[];
}
