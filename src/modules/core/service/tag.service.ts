import {
  CreateTagDto,
  GetTagResponse,
  GetTagsResponse,
  UpdateTagDto,
} from "@/modules/core/model/Tag";
import {
  ITagRepository,
  tagRepository,
} from "@/modules/core/repository/tag.repository";

export class TagService {
  constructor(private readonly tagRepository: ITagRepository) {}

  async getTags(): Promise<GetTagsResponse> {
    return await this.tagRepository.findMany();
  }

  async getTagById(id: string): Promise<GetTagResponse | null> {
    return await this.tagRepository.findById(id);
  }

  async createTag(data: CreateTagDto): Promise<void> {
    return await this.tagRepository.create(data);
  }

  async updateTag(data: UpdateTagDto): Promise<void> {
    return await this.tagRepository.update(data);
  }

  async deleteTag(id: string): Promise<void> {
    return await this.tagRepository.delete(id);
  }
}

export const tagService = new TagService(tagRepository);
