import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
        articleTags: true,
        articleLikes: true,
        articleComments: {
          include: {
            replies: {
              include: {
                author: true,
                replyToUser: true,
              },
            },
            author: true,
          },
        },
      },
    });
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
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
