import { NextResponse } from "next/server";
import { TagService } from "@/modules/core/service/tag.service";
import { PrismaTagRepository } from "@/modules/core/repository/tag.repository";

const tagRepository = new PrismaTagRepository();
const tagService = new TagService(tagRepository);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const tag = await tagService.getTagById(id);

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
    await tagService.updateTag({
      id,
      name,
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Tag mis à jour",
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

    await tagService.deleteTag(id);

    return NextResponse.json(
      {
        message: "Tag supprimé",
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
