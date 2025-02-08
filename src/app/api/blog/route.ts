import { NextResponse } from "next/server";
import { PrismaArticleRepository } from "@/modules/core/repository/article.repository";
import { ArticleService } from "@/modules/core/service/article.service";

const articleRepository = new PrismaArticleRepository();
const articleService = new ArticleService(articleRepository);

export async function GET() {
  try {
    const articles = await articleService.getArticles();
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
    const article = await articleService.createArticle(data);

    return NextResponse.json(
      { message: "Article créé", article },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
