import { NextResponse } from "next/server";
import { PrismaArticleRepository } from "@/modules/core/repository/article.repository";
import { ArticleService } from "@/modules/core/service/article.service";

const articleRepository = new PrismaArticleRepository();
const articleService = new ArticleService(articleRepository);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const articleComments = await articleService.getArticleComments(id);

    return NextResponse.json(articleComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { articleId, content, authorId, replyToId, replyToUserId } =
      await request.json();

    await articleService.createArticleComment({
      articleId,
      content,
      authorId,
      replyToId,
      replyToUserId,
    });

    return NextResponse.json({ message: "Commentaire créé" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
