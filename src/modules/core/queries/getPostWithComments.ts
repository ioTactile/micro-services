import { IPostGateway } from "@mm/modules/core/gateway/post.gateway";

export class GetPostWithComments {
  constructor(private readonly postGateway: IPostGateway) {}

  async execute(id: string) {
    const post = await this.postGateway.getPost(id);
    const comments = await this.postGateway.getPostComments(id);
    return { ...post, comments };
  }
}
