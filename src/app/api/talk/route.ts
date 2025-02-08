import { NextResponse } from "next/server";
import { PrismaTalkRepository } from "@/modules/core/repository/talk.repository";
import { TalkService } from "@/modules/core/service/talk.service";

const talkRepository = new PrismaTalkRepository();
const talkService = new TalkService(talkRepository);

export async function GET() {
  try {
    const talks = await talkService.getTalks();
    return NextResponse.json(talks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await talkService.createTalk(data);

    return NextResponse.json({ message: "Discussion créée" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
