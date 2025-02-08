import { describe, it, expect, vi } from "vitest";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { axiosInstance } from "@/lib/globals";
import {
  mockArticle,
  mockArticleComment,
  mockArticleDto,
  mockArticleLike,
  mockArticles,
  mockUpdateArticleDto,
} from "@/__tests__/fixtures/article.fixture";
import { beforeEach } from "node:test";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ArticleGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait récupérer la liste des articles", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockArticles,
    });

    const result = await articleGateway.getArticles();
    expect(result).toEqual(mockArticles);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/blog");
  });

  it("devrait récupérer un article par son id", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockArticle,
    });

    const result = await articleGateway.getArticle(mockArticle.id);
    expect(result).toEqual(mockArticle);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/api/blog/${mockArticle.id}`
    );
  });

  it("devrait créer un nouvel article", async () => {
    const mockResponse = {
      message: "Article créé",
      article: mockArticle,
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticle(mockArticleDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/blog",
      mockArticleDto
    );
  });

  it("devrait mettre à jour un article", async () => {
    const mockResponse = {
      message: "Article mis à jour",
      article: mockArticle,
    };

    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.updateArticle(mockUpdateArticleDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      `/api/blog/${mockArticle.id}`,
      mockUpdateArticleDto
    );
  });

  it("devrait supprimer un article", async () => {
    const mockResponse = { message: "Article supprimé" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticle(mockArticle.id);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/blog/${mockArticle.id}`
    );
  });

  it("devrait créer un nouveau commentaire pour un article", async () => {
    const mockResponse = {
      message: "Commentaire créé",
      articleComment: mockArticleComment,
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticleComment(
      mockArticleComment
    );
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/blog/${mockArticleComment.articleId}/comment`,
      mockArticleComment
    );
  });

  it("devrait supprimer un commentaire d'article", async () => {
    const mockResponse = { message: "Commentaire supprimé" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticleComment(
      mockArticleComment.articleId,
      mockArticleComment.id
    );
    expect(result).toEqual(mockResponse);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/blog/${mockArticleComment.articleId}/comment/${mockArticleComment.id}`
    );
  });

  it("devrait créer un like pour un article", async () => {
    const mockResponse = {
      message: "Article liké",
      articleLike: mockArticleLike,
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticleLike(mockArticleLike);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/blog/${mockArticleLike.articleId}/like`,
      mockArticleLike
    );
  });

  it("devrait supprimer un like pour un article", async () => {
    const mockResponse = { message: "Like supprimé" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticleLike(mockArticleLike);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/blog/${mockArticleLike.articleId}/like`
    );
  });
});
