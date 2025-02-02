import { Talk, User } from "@prisma/client";
import { CreateTalkFormData } from "@/modules/react/sections/talks/_schemas/create-talk";

export interface CreateTalkDto extends CreateTalkFormData {
  authorId: string;
}

export interface ExtendedTalk extends Talk {
  author: User;
  _count: {
    talkComments: number;
  };
}
