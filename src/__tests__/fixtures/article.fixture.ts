import {
  CreateArticleDto,
  ExtendedArticle,
  UpdateArticleDto,
} from "@/modules/core/model/Article";
import { ArticleComment, ArticleLike } from "@prisma/client";

export const mockArticle: ExtendedArticle = {
  id: "1",
  title: "Test Article",
  content: "Test content",
  slug: "test-article",
  imageUrl: "https://example.com/image.jpg",
  imageName: "test-image",
  excerpt: "Test excerpt",
  published: true,
  author: {
    id: "1",
    clerkId: "user_1",
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://example.com/image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  authorId: "user_1",
  createdAt: new Date(),
  updatedAt: new Date(),

  articleTags: [],
};

export const mockArticles: ExtendedArticle[] = [
  { ...mockArticle, id: "1" },
  { ...mockArticle, id: "2" },
];

export const mockArticleDto: CreateArticleDto = {
  title: "Test Article",
  content: "Test content",
  authorId: "user_1",
  imageUrl: "https://example.com/image.jpg",
  imageName: "test-image",
  excerpt: "Test excerpt",
  published: true,
  tags: [],
};

export const mockUpdateArticleDto: UpdateArticleDto = {
  ...mockArticleDto,
  id: "1",
  updatedAt: new Date(),
};

export const mockArticleComment: ArticleComment = {
  id: "1",
  content: "Test comment",
  articleId: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "user_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockArticleComments: ArticleComment[] = [
  { ...mockArticleComment, id: "1" },
  { ...mockArticleComment, id: "2" },
];

export const mockArticleLike: ArticleLike = {
  articleId: "1",
  userId: "user_1",
  createdAt: new Date(),
};
