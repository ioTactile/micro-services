import { axiosInstance } from "@/lib/globals";
import { ITagGateway } from "@/modules/core/gateway/tag.gateway";
import { CreateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/create-tag";
import { UpdateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/update-tag";
import { Tag } from "@prisma/client";

export class ApTagGateway implements ITagGateway {
  async getTags(): Promise<Tag[]> {
    const response = await axiosInstance.get<Tag[]>("/api/tag");
    return response.data;
  }

  async createTag(
    tag: CreateTagInputs
  ): Promise<{ message: string; tag: Tag }> {
    const response = await axiosInstance.post<{ message: string; tag: Tag }>(
      "/api/tag",
      tag
    );
    return response.data;
  }

  async deleteTag(id: string): Promise<{ message: string }> {
    const response = await axiosInstance.delete<{ message: string }>(
      `/api/tag/${id}`
    );
    return response.data;
  }

  async updateTag(
    tag: UpdateTagInputs
  ): Promise<{ message: string; tag: Tag }> {
    const response = await axiosInstance.put<{ message: string; tag: Tag }>(
      `/api/tag/${tag.id}`,
      tag
    );
    return response.data;
  }
}

export const tagGateway = new ApTagGateway();
