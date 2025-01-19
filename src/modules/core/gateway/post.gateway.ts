import { Post } from "@prisma/client";

export interface IPostGateway {
  getPosts: () => Promise<Post[]>;
}
