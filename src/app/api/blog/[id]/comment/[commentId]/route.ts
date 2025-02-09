import { NextResponse } from "next/server";
import { PrismaArticleRepository } from "@/modules/core/repository/article.repository";
import { ArticleService } from "@/modules/core/service/article.service";

const articleRepository = new PrismaArticleRepository();
const articleService = new ArticleService(articleRepository);

export async function DELETE(request: Request) {
  try {
    const { articleId, articleCommentId } = await request.json();

    await articleService.deleteArticleComment({
      articleId,
      articleCommentId,
    });

    return NextResponse.json(
      { message: "Commentaire supprimé" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
