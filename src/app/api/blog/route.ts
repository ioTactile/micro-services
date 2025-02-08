import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        articleTags: true,
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
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, excerpt, imageUrl, imageName, authorId, tags } =
      await request.json();

    const slug =
      title.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString();

    const article = await prisma.article.create({
      data: {
        title,
        content,
        slug,
        excerpt,
        imageUrl,
        imageName,
        authorId,
        articleTags: {
          create: tags.map((tag: string) => ({
            tagId: tag,
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

    return NextResponse.json(
      { message: "Article créé", article },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}
