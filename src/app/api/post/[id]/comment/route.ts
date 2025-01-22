import { prisma } from "@mm/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postComments = await prisma.postComment.findMany({
      where: { postId: params.slug, replyToId: null },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            replyToUser: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(postComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { postId, content, authorId, replyToId, replyToUserId } =
      await request.json();

    const reply = await prisma.postComment.create({
      data: {
        content,
        authorId,
        postId,
        replyToId,
        replyToUserId,
      },
    });

    console.log(reply);

    return NextResponse.json(
      { message: "Réponse au commentaire créée", comment: reply },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
