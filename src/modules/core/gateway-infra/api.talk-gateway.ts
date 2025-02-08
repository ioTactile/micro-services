import { ITalkGateway } from "@/modules/core/gateway/talk.gateway";
import { Talk, TalkComment } from "@prisma/client";
import {
  CreateTalkDto,
  ExtendedTalk,
  ExtendedTalkWithComments,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";

import { CreateTalkCommentDto } from "@/modules/core/model/TalkComment";
import { axiosInstance } from "@/lib/globals";

export class ApiTalkGateway implements ITalkGateway {
  async getTalks(): Promise<ExtendedTalk[]> {
    const response = await axiosInstance.get<ExtendedTalk[]>("/api/talk");
    return response.data;
  }

  async getTalkWithComments(id: string): Promise<ExtendedTalkWithComments> {
    const response = await axiosInstance.get<ExtendedTalkWithComments>(
      `/api/talk/${id}`
    );
    return response.data;
  }

  async createTalk(talk: CreateTalkDto): Promise<{
    message: string;
    talk: Talk;
  }> {
    const response = await axiosInstance.post("/api/talk", talk);
    return response.data;
  }

  async updateTalk(talk: UpdateTalkDto): Promise<{
    message: string;
    talk: Talk;
  }> {
    const response = await axiosInstance.patch("/api/talk", talk);
    return response.data;
  }

  async deleteTalk(id: string): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/talk/${id}`);
    return response.data;
  }

  async createTalkComment(talkComment: CreateTalkCommentDto): Promise<{
    message: string;
    talkComment: TalkComment;
  }> {
    const response = await axiosInstance.post(
      `/api/talk/${talkComment.talkId}/comment`,
      talkComment
    );
    return response.data;
  }

  async deleteTalkComment(
    talkId: string,
    talkCommentId: string
  ): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/talk/${talkId}/comment/${talkCommentId}`
    );
    return response.data;
  }
}

export const talkGateway = new ApiTalkGateway();
