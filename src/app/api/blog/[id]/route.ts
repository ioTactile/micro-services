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
    const article = await articleService.getArticleById(id);

    if (!article) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const {
      id,
      title,
      content,
      excerpt,
      imageUrl,
      imageName,
      tags,
      published,
    } = await request.json();

    await articleService.updateArticle({
      id,
      title,
      content,
      excerpt,
      imageUrl,
      imageName,
      published,
      updatedAt: new Date(),
      tags,
    });

    return NextResponse.json(
      {
        message: "Article mis à jour",
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
    await articleService.deleteArticle(id);

    return NextResponse.json({ message: "Article supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
