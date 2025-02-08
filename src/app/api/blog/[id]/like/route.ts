import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { articleId, userId } = await request.json();

    const like = await prisma.articleLike.create({
      data: {
        articleId,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Article liké", like },
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
    const { articleId, userId } = await request.json();

    await prisma.articleLike.delete({
      where: { articleId_userId: { articleId, userId } },
    });

    return NextResponse.json(
      { message: "Like supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
