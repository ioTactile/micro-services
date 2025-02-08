import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const commentId = (await params).commentId;

    await prisma.talkComment.delete({
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
