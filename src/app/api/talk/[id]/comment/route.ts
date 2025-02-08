import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const talkComments = await prisma.talkComment.findMany({
      where: {
        talkId: id,
      },
    });
    return NextResponse.json(talkComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { content, talkId, authorId, replyToId, replyToUserId } =
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
