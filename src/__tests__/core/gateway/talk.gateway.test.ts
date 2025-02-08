import { describe, it, expect, vi } from "vitest";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { axiosInstance } from "@/lib/globals";
import {
  mockTalk,
  mockTalkComment,
  mockTalkDto,
  mockTalks,
  mockTalkWithComments,
  mockUpdateTalkDto,
} from "@/__tests__/fixtures/talk.fixture";
import { beforeEach } from "node:test";

vi.mock("@/lib/globals", () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("TalkGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait récupérer la liste des talks", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: mockTalks });

    const result = await talkGateway.getTalks();
    expect(result).toEqual(mockTalks);
    expect(axiosInstance.get).toHaveBeenCalledWith("/api/talk");
  });

  it("devrait récupérer un talk par son id", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTalk,
    });

    const result = await talkGateway.getTalkWithComments(mockTalk.id);
    expect(result).toEqual(mockTalk);
    expect(axiosInstance.get).toHaveBeenCalledWith(`/api/talk/${mockTalk.id}`);
  });

  it("devrait créer un nouveau talk", async () => {
    const mockResponse = {
      message: "Discussion créée",
      talk: mockTalk,
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.createTalk(mockTalkDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith("/api/talk", mockTalkDto);
  });

  it("devrait mettre à jour un talk", async () => {
    const mockResponse = {
      message: "Discussion mise à jour",
      talk: mockTalk,
    };

    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.updateTalk(mockUpdateTalkDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      "/api/talk",
      mockUpdateTalkDto
    );
  });

  it("devrait supprimer un talk", async () => {
    const mockResponse = { message: "Discussion supprimée" };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.deleteTalk(mockTalk.id);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/talk/${mockTalk.id}`
    );
  });

  it("devrait récupérer un talk avec ses commentaires", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockTalkWithComments,
    });

    const result = await talkGateway.getTalkWithComments(
      mockTalkWithComments.id
    );
    expect(result).toEqual(mockTalkWithComments);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/api/talk/${mockTalkWithComments.id}`
    );
  });

  it("devrait créer un nouveau commentaire pour un talk", async () => {
    const mockResponse = {
      message: "Commentaire créé",
      talkComment: mockTalkComment,
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.createTalkComment(mockTalkComment);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/talk/${mockTalkComment.talkId}/comment`,
      mockTalkComment
    );
  });

  it("devrait supprimer un commentaire pour un talk", async () => {
    const mockResponse = {
      message: "Commentaire supprimé",
    };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await talkGateway.deleteTalkComment(
      mockTalkComment.talkId,
      mockTalkComment.id
    );
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/talk/${mockTalkComment.talkId}/comment/${mockTalkComment.id}`
    );
  });
});
