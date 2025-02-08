import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    return NextResponse.json(tag, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, name } = await request.json();
    const tag = await prisma.tag.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(
      {
        message: "Tag mis à jour avec succès",
        tag,
      },
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
    const tag = await prisma.tag.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        message: "Tag supprimé avec succès",
        tag,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}
