import { NextResponse } from "next/server";
import { PrismaTalkRepository } from "@/modules/core/repository/talk.repository";
import { TalkService } from "@/modules/core/service/talk.service";

const talkRepository = new PrismaTalkRepository();
const talkService = new TalkService(talkRepository);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const talk = await talkService.getTalkById(id);

    return NextResponse.json(talk, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, title, content, updatedAt } = await request.json();

    await talkService.updateTalk({ id, title, content, updatedAt });

    return NextResponse.json(
      { message: "Discussion mise à jour" },
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
    await talkService.deleteTalk(id);

    return NextResponse.json(
      { message: "Discussion supprimée" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
