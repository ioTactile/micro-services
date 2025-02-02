import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const talks = await prisma.talk.findMany({
      include: {
        author: true,
        _count: {
          select: {
            talkComments: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(talks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}
