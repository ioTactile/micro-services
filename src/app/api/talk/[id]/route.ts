import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const talk = await prisma.talk.findUnique({
      where: { id },
      include: {
        author: true,
        talkComments: {
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
    return NextResponse.json(talk, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
