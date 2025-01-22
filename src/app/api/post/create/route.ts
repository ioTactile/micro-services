import { prisma } from "@mm/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { title, content, authorId } = await request.json();

    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json({ message: "Post créé" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
