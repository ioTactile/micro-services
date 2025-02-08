import {
  CreateTagDto,
  GetTagsResponse,
  UpdateTagDto,
} from "@/modules/core/model/Tag";

export interface ITagGateway {
  getTags: () => Promise<GetTagsResponse>;
  createTag: (tag: CreateTagDto) => Promise<{
    message: string;
  }>;

  deleteTag: (id: string) => Promise<{
    message: string;
  }>;
  updateTag: (tag: UpdateTagDto) => Promise<{
    message: string;
  }>;
}
