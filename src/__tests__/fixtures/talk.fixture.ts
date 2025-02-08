// import {
//   CreateTalkDto,
//   UpdateTalkDto,
//   CreateTalkCommentDto,
//   GetTalkResponse,
//   GetTalkCommentsResponse,
// } from "@/modules/core/model/Talk";

// export const mockTalk: GetTalkResponse = {
//   id: "1",
//   title: "Test Talk",
//   content: "Test content",
//   author: {
//     id: "1",
//     clerkId: "user_1",
//     name: "John Doe",
//     email: "john@example.com",
//     imageUrl: "https://example.com/image.jpg",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   authorId: "user_1",
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   _count: {
//     talkComments: 2,
//   },
//   talkComments: [],
// };

// export const mockTalkWithComments: GetTalkResponse = {
//   ...mockTalk,
//   talkComments: [
//     {
//       id: "comment_1",
//       content: "Premier commentaire",
//       authorId: "user_2",
//       talkId: "1",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       replyToId: null,
//       replyToUserId: null,
//       author: {
//         id: "2",
//         clerkId: "user_2",
//         name: "Jane Doe",
//         email: "jane@example.com",
//         imageUrl: "https://example.com/image2.jpg",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       replies: [],
//       replyToUser: null,
//     },
//   ],
// };

// export const mockTalks: ExtendedTalk[] = [
//   { ...mockTalk, id: "1" },
//   { ...mockTalk, id: "2" },
// ];

// export const mockTalkDto: CreateTalkDto = {
//   title: "Test Talk",
//   content: "Test content",
//   authorId: "user_1",
// };

// export const mockUpdateTalkDto: UpdateTalkDto = {
//   ...mockTalkDto,
//   id: "1",
// };

// export const mockTalkCommentDto: CreateTalkCommentDto = {
//   content: "Test comment",
//   talkId: "1",
//   authorId: "user_1",
//   replyToId: null,
//   replyToUserId: null,
// };

// export const mockTalkComment: GetTalkCommentsResponse = {
//   ...mockTalkCommentDto,
//   id: "1",
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   author: {

//     id: "1",
//     clerkId: "user_1",
//     name: "John Doe",
//     email: "john@example.com",
//     imageUrl: "https://example.com/image.jpg",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   authorId: "user_1",
//   talkId: "1",
//   replyToId: null,
//   replyToUserId: null,
//   replyToUser: null,
// };

// export const mockTalkComments: ExtendedTalkComment[] = [
//   { ...mockTalkComment, id: "1" },
//   { ...mockTalkComment, id: "2" },
// ];
