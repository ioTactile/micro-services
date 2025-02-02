import { Talk } from "@prisma/client";
import { CreateTalkDto, ExtendedTalk } from "@/modules/core/model/Talk";
import {
  CreateTalkCommentDto,
  ExtendedTalkComment,
} from "@/modules/core/model/TalkComment";

export interface ITalkGateway {
  getTalks: () => Promise<Talk[]>;
  createTalk: (talk: CreateTalkDto) => Promise<Talk>;
  getTalk: (id: string) => Promise<ExtendedTalk>;
  getTalkComments: (talkId: string) => Promise<ExtendedTalkComment[]>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<void>;
}
