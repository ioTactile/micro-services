import { ITalkGateway } from "@/modules/core/gateway/talk.gateway";
import { Talk } from "@prisma/client";
import { CreateTalkDto, ExtendedTalk } from "@/modules/core/model/Talk";

import {
  CreateTalkCommentDto,
  ExtendedTalkComment,
} from "@/modules/core/model/TalkComment";
import { axiosInstance } from "@/lib/globals";

export class ApiTalkGateway implements ITalkGateway {
  async getTalks(): Promise<ExtendedTalk[]> {
    const response = await axiosInstance.get<ExtendedTalk[]>("/api/talk");
    console.log(response.data);
    return response.data;
  }

  async getTalk(id: string): Promise<ExtendedTalk> {
    const response = await axiosInstance.get<ExtendedTalk>(`/api/talk/${id}`);
    return response.data;
  }

  async createTalk(talk: CreateTalkDto): Promise<Talk> {
    const response = await axiosInstance.patch("/api/talk/create", talk);
    return response.data;
  }

  async getTalkComments(id: string): Promise<ExtendedTalkComment[]> {
    const response = await axiosInstance.get<ExtendedTalkComment[]>(
      `/api/talk/${id}/comment`
    );
    return response.data;
  }

  async createTalkComment(talkComment: CreateTalkCommentDto): Promise<void> {
    await axiosInstance.patch(
      `/api/talk/${talkComment.talkId}/comment`,
      talkComment
    );
  }
}

export const talkGateway = new ApiTalkGateway();
