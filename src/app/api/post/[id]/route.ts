import { prisma } from "@mm/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const id = request.url.split("/").pop();
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
