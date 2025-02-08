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

export async function PATCH(request: Request) {
  try {
    const { id, title, content, updatedAt } = await request.json();

    const talk = await prisma.talk.update({
      where: { id },
      data: { title, content, updatedAt },
    });

    return NextResponse.json(
      { message: "Discussion mise à jour avec succès", talk },
      { status: 200 }
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
    await prisma.talk.delete({ where: { id } });
    return NextResponse.json(
      { message: "Discussion supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
