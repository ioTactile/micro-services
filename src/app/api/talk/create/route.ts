import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { title, content, authorId } = await request.json();

    await prisma.talk.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json({ message: "Discussion créée" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
