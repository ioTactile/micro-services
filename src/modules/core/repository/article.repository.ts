import prisma from "@/prisma";
import {
  DeleteArticleCommentDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  UpdateArticleDto,
} from "@/modules/core/model/Article";
import {
  CreateArticleDto,
  CreateArticleCommentDto,
} from "@/modules/core/model/Article";

export interface IArticleRepository {
  findMany(): Promise<GetArticlesResponse>;
  findBySlug(slug: string): Promise<GetArticleResponse | null>;
  findById(id: string): Promise<GetArticleResponse | null>;
  create(data: CreateArticleDto): Promise<void>;
  update(data: UpdateArticleDto): Promise<void>;
  delete(id: string): Promise<void>;
  getArticleComments(articleId: string): Promise<GetArticleCommentsResponse>;
  createArticleComment(data: CreateArticleCommentDto): Promise<void>;
  deleteArticleComment(data: DeleteArticleCommentDto): Promise<void>;
  like(articleId: string, userId: string): Promise<void>;
  unlike(articleId: string, userId: string): Promise<void>;
}

export class PrismaArticleRepository implements IArticleRepository {
  async findMany(): Promise<GetArticlesResponse> {
    return await prisma.article.findMany({
      include: {
        author: true,
        articleTags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            articleComments: true,
            articleLikes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findBySlug(slug: string): Promise<GetArticleResponse | null> {
    console.log("slug", slug);
    return await prisma.article.findUnique({
      where: { slug: slug },
      include: {
        author: true,
        articleTags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            articleComments: true,
            articleLikes: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<GetArticleResponse | null> {
    return await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
        articleTags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            articleComments: true,
            articleLikes: true,
          },
        },
      },
    });
  }

  async create(data: CreateArticleDto): Promise<void> {
    const slug =
      data.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString();

    await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        slug,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        imageName: data.imageName,
        authorId: data.authorId,
        articleTags: {
          create: data.articleTags?.map((tag: { id: string }) => ({
            tagId: tag.id,
          })),
        },
      },
      include: {
        articleTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async update(data: UpdateArticleDto): Promise<void> {
    const slug =
      data.title.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString();

    await prisma.article.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        slug,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        imageName: data.imageName,
        articleTags: {
          deleteMany: {},
          create: data.articleTags?.map((tag: { id: string }) => ({
            tagId: tag.id,
          })),
        },
      },
      include: {
        articleTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.article.delete({
      where: { id },
    });
  }

  async getArticleComments(
    articleId: string
  ): Promise<GetArticleCommentsResponse> {
    return await prisma.articleComment.findMany({
      where: { articleId },
      include: {
        author: true,
        replyToUser: true,
        replies: {
          include: {
            author: true,
            replyToUser: true,
          },
        },
      },
    });
  }

  async createArticleComment(data: CreateArticleCommentDto): Promise<void> {
    await prisma.articleComment.create({
      data,
    });
  }

  async deleteArticleComment(data: DeleteArticleCommentDto): Promise<void> {
    await prisma.articleComment.delete({
      where: { id: data.articleCommentId },
    });
  }

  async like(articleId: string, userId: string): Promise<void> {
    await prisma.articleLike.create({
      data: { articleId, userId },
    });
  }

  async unlike(articleId: string, userId: string): Promise<void> {
    await prisma.articleLike.delete({
      where: { articleId_userId: { articleId, userId } },
    });
  }
}

export const articleRepository = new PrismaArticleRepository();
