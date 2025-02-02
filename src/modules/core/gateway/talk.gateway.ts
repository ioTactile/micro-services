import { Talk } from "@prisma/client";
import {
  CreateTalkDto,
  ExtendedTalkWithComments,
} from "@/modules/core/model/Talk";
import { CreateTalkCommentDto } from "@/modules/core/model/TalkComment";

export interface ITalkGateway {
  getTalks: () => Promise<Talk[]>;
  createTalk: (talk: CreateTalkDto) => Promise<Talk>;
  getTalkWithComments: (id: string) => Promise<ExtendedTalkWithComments>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<void>;
}
