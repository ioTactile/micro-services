import { ITalkGateway } from "@/modules/core/gateway/talk.gateway";
import { Talk } from "@prisma/client";
import {
  CreateTalkDto,
  ExtendedTalk,
  ExtendedTalkWithComments,
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

  async createTalk(talk: CreateTalkDto): Promise<Talk> {
    const response = await axiosInstance.patch("/api/talk/create", talk);
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
