import { Talk, User } from "@prisma/client";
import { CreateTalkInputs } from "@/modules/react/sections/talks/_schemas/create-talk";
import { ExtendedTalkComment } from "@/modules/core/model/TalkComment";

export interface CreateTalkDto extends CreateTalkInputs {
  authorId: string;
}

export interface ExtendedTalk extends Talk {
  author: User;
  _count: {
    talkComments: number;
  };
}

export interface ExtendedTalkWithComments extends Talk {
  author: User;
  talkComments: ExtendedTalkComment[];
}
