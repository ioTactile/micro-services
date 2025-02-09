import {
  CreateTalkDto,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
  CreateTalkCommentDto,
  DeleteTalkCommentDto,
} from "@/modules/core/model/Talk";

export interface ITalkGateway {
  getTalks: () => Promise<GetTalksResponse>;
  getTalkWithComments: (id: string) => Promise<GetTalkResponse>;
  createTalk: (talk: CreateTalkDto) => Promise<{
    message: string;
  }>;
  updateTalk: (talk: UpdateTalkDto) => Promise<{
    message: string;
  }>;
  deleteTalk: (id: string) => Promise<{
    message: string;
  }>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<{
    message: string;
  }>;
  deleteTalkComment: (talkComment: DeleteTalkCommentDto) => Promise<{
    message: string;
  }>;
}
