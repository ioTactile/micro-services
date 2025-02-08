import { NextResponse } from "next/server";
import { PrismaArticleRepository } from "@/modules/core/repository/article.repository";
import { ArticleService } from "@/modules/core/service/article.service";

const articleRepository = new PrismaArticleRepository();
const articleService = new ArticleService(articleRepository);

export async function PATCH(request: Request) {
  try {
    const { articleId, userId } = await request.json();

    await articleService.likeArticle(articleId, userId);

    return NextResponse.json({ message: "Article liké" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { articleId, userId } = await request.json();

    await articleService.unlikeArticle(articleId, userId);

    return NextResponse.json({ message: "Like supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
