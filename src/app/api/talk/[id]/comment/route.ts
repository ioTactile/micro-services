import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { talkId, content, authorId, replyToId, replyToUserId } =
      await request.json();

    const reply = await prisma.talkComment.create({
      data: {
        content,
        authorId,
        talkId,
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
