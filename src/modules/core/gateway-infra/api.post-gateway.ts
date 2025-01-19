import { IPostGateway } from "@mm/modules/core/gateway/post.gateway";
import { Post } from "@prisma/client";
import axios from "axios";

export class ApiPostGateway implements IPostGateway {
  async getPosts(): Promise<Post[]> {
    const response = await axios.get("/api/post");
    return response.data;
  }
}
