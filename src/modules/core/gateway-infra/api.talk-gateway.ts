import { ITalkGateway } from "@/modules/core/gateway/talk.gateway";
import {
  CreateTalkDto,
  DeleteTalkCommentDto,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";
import { CreateTalkCommentDto } from "@/modules/core/model/Talk";
import { axiosInstance } from "@/lib/globals";

export class ApiTalkGateway implements ITalkGateway {
  async getTalks(): Promise<GetTalksResponse> {
    const response = await axiosInstance.get<GetTalksResponse>("/api/talk");
    return response.data;
  }

  async getTalkWithComments(id: string): Promise<GetTalkResponse> {
    const response = await axiosInstance.get<GetTalkResponse>(
      `/api/talk/${id}`
    );
    return response.data;
  }

  async createTalk(talk: CreateTalkDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post("/api/talk", talk);
    return response.data;
  }

  async updateTalk(talk: UpdateTalkDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch("/api/talk", talk);
    return response.data;
  }

  async deleteTalk(id: string): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/talk/${id}`, {
      data: {
        id,
      },
    });
    return response.data;
  }

  async createTalkComment(talkComment: CreateTalkCommentDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post(
      `/api/talk/${talkComment.talkId}/comment`,
      talkComment
    );
    return response.data;
  }

  async deleteTalkComment(talkComment: DeleteTalkCommentDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/talk/${talkComment.talkId}/comment/${talkComment.talkCommentId}`,
      {
        data: talkComment,
      }
    );
    return response.data;
  }
}

export const talkGateway = new ApiTalkGateway();
