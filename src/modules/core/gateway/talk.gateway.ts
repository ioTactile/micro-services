import {
  CreateTalkDto,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
  CreateTalkCommentDto,
  DeleteTalkDto,
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
  deleteTalk: (talk: DeleteTalkDto) => Promise<{
    message: string;
  }>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<{
    message: string;
  }>;
  deleteTalkComment: (
    talkId: string,
    talkCommentId: string
  ) => Promise<{
    message: string;
  }>;
}
