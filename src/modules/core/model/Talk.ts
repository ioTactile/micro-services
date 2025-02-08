import { Talk, User } from "@prisma/client";
import { CreateTalkInputs } from "@/modules/react/sections/talks/_schemas/create-talk";
import { ExtendedTalkComment } from "@/modules/core/model/TalkComment";
import { UpdateTalkInputs } from "@/modules/react/sections/talks/_schemas/update-talk";

export interface CreateTalkDto extends CreateTalkInputs {
  authorId: string;
}

export interface UpdateTalkDto extends UpdateTalkInputs {
  authorId: string;
  id: string;
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
