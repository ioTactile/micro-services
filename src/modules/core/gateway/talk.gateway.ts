import { Talk, TalkComment } from "@prisma/client";
import {
  CreateTalkDto,
  ExtendedTalkWithComments,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";
import { CreateTalkCommentDto } from "@/modules/core/model/TalkComment";

export interface ITalkGateway {
  getTalks: () => Promise<Talk[]>;
  createTalk: (talk: CreateTalkDto) => Promise<{
    message: string;
    talk: Talk;
  }>;
  updateTalk: (talk: UpdateTalkDto) => Promise<{
    message: string;
    talk: Talk;
  }>;
  deleteTalk: (id: string) => Promise<{
    message: string;
  }>;
  getTalkWithComments: (id: string) => Promise<ExtendedTalkWithComments>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<{
    message: string;
    talkComment: TalkComment;
  }>;
  deleteTalkComment: (
    talkId: string,
    talkCommentId: string
  ) => Promise<{
    message: string;
  }>;
}
