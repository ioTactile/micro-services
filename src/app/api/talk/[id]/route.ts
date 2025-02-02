import prisma from "@/prisma";
import { PageProps } from "@/types/pages-props";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: PageProps) {
  const { id } = await params;

  try {
    const talk = await prisma.talk.findUnique({
      where: { id },
      include: {
        author: true,
        talkComments: true,
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
