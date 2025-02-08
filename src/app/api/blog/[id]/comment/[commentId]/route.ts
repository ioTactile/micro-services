import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { commentId } = await request.json();

    await prisma.articleComment.delete({
      where: { id: commentId },
    });

    return NextResponse.json(
      { message: "Commentaire supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
