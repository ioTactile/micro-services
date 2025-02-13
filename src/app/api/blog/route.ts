import { NextResponse } from "next/server";
import { articleService } from "@/modules/core/service/article.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") ?? undefined;
    const articles = await articleService.getArticles(userId);
    return NextResponse.json(articles, { status: 200 });
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
    await articleService.createArticle(data);

    return NextResponse.json({ message: "Article créé" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
