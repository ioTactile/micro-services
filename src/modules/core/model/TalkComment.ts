import { CreateTalkCommentInputs } from "@/modules/react/sections/talks/_schemas/create-talk-comment";
import { TalkComment, User } from "@prisma/client";

export interface CreateTalkCommentDto extends CreateTalkCommentInputs {
  talkId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
}

export interface ExtendedTalkComment extends TalkComment {
  author: User;
  replies?: Omit<ExtendedTalkComment, "replies">[];
  replyToUser: User | null;
}
