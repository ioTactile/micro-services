import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { articleId, content, authorId, replyToId, replyToUserId } =
      await request.json();

    const reply = await prisma.articleComment.create({
      data: {
        content,
        authorId,
        articleId,
        replyToId,
        replyToUserId,
      },
    });

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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.articleComment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Commentaire supprimé" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
