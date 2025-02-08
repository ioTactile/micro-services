import { NextResponse } from "next/server";
import { TagService } from "@/modules/core/service/tag.service";
import { PrismaTagRepository } from "@/modules/core/repository/tag.repository";

const tagRepository = new PrismaTagRepository();
const tagService = new TagService(tagRepository);

export async function GET() {
  try {
    const tags = await tagService.getTags();

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },

      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const tag = await tagService.createTag({ name });

    return NextResponse.json({ message: "Tag créé", tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
