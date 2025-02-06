import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articleTags = await prisma.articleTag.findMany();
    return NextResponse.json(articleTags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const tag = await prisma.tag.create({
    data: {
      name,
    },
  });
  return NextResponse.json(
    {
      message: "Tag créé avec succès",
      tag,
    },
    { status: 201 }
  );
}
