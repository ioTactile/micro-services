import { NextResponse } from "next/server";
import { PrismaArticleRepository } from "@/modules/core/repository/article.repository";
import { ArticleService } from "@/modules/core/service/article.service";
import { GetArticleResponse } from "@/modules/core/model/Article";

const articleRepository = new PrismaArticleRepository();
const articleService = new ArticleService(articleRepository);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  const identifier = (await params).identifier;

  try {
    let article: GetArticleResponse | null;

    // Vérifie si l'identifiant est un CUID
    if (/^c[a-z0-9]{24,27}$/i.test(identifier)) {
      console.log("Recherche par ID");
      article = await articleService.getArticleById(identifier);
    } else {
      console.log("Recherche par slug");
      article = await articleService.getArticleBySlug(identifier);
    }

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
      articleTags,
      published,
      updatedAt,
    } = await request.json();

    await articleService.updateArticle({
      id,
      title,
      content,
      excerpt,
      imageUrl,
      imageName,
      published,
      updatedAt,
      articleTags,
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
