import {
  CreateTalkDto,
  ExtendedTalk,
  ExtendedTalkWithComments,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";
import {
  CreateTalkCommentDto,
  ExtendedTalkComment,
} from "@/modules/core/model/TalkComment";

export const mockTalk: ExtendedTalk = {
  id: "1",
  title: "Test Talk",
  content: "Test content",
  author: {
    id: "1",
    clerkId: "user_1",
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://example.com/image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  authorId: "user_1",
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: {
    talkComments: 2,
  },
};

export const mockTalkWithComments: ExtendedTalkWithComments = {
  ...mockTalk,
  talkComments: [
    {
      id: "comment_1",
      content: "Premier commentaire",
      authorId: "user_2",
      talkId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      replyToId: null,
      replyToUserId: null,
      author: {
        id: "2",
        clerkId: "user_2",
        name: "Jane Doe",
        email: "jane@example.com",
        imageUrl: "https://example.com/image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      replies: [],
      replyToUser: null,
    },
  ],
};

export const mockTalks: ExtendedTalk[] = [
  { ...mockTalk, id: "1" },
  { ...mockTalk, id: "2" },
];

export const mockTalkDto: CreateTalkDto = {
  title: "Test Talk",
  content: "Test content",
  authorId: "user_1",
};

export const mockUpdateTalkDto: UpdateTalkDto = {
  ...mockTalkDto,
  id: "1",
  updatedAt: new Date(),
};

export const mockTalkCommentDto: CreateTalkCommentDto = {
  content: "Test comment",
  talkId: "1",
  authorId: "user_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockTalkComment: ExtendedTalkComment = {
  ...mockTalkCommentDto,
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  author: {
    id: "1",
    clerkId: "user_1",
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://example.com/image.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  authorId: "user_1",
  talkId: "1",
  replyToId: null,
  replyToUserId: null,
  replyToUser: null,
};

export const mockTalkComments: ExtendedTalkComment[] = [
  { ...mockTalkComment, id: "1" },
  { ...mockTalkComment, id: "2" },
];
