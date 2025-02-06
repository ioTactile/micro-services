import { CreateArticleCommentInputs } from "@/modules/react/sections/articles/_schemas/create-article-comment";
import { ArticleComment, User } from "@prisma/client";

export interface CreateArticleCommentDto extends CreateArticleCommentInputs {
  articleId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
}

export interface ExtendedArticleComment extends ArticleComment {
  author: User;
  replies?: Omit<ExtendedArticleComment, "replies">[];
  replyToUser: User | null;
}
