import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const articleComments = await prisma.articleComment.findMany({
      where: { articleId: id },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            replyToUser: true,
          },
        },
      },
    });
    return NextResponse.json(articleComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
