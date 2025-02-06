import { CreateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/create-tag";
import { UpdateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/update-tag";
import { Tag } from "@prisma/client";

export interface ITagGateway {
  getTags: () => Promise<Tag[]>;
  createTag: (tag: CreateTagInputs) => Promise<{
    message: string;
    tag: Tag;
  }>;
  deleteTag: (id: string) => Promise<{
    message: string;
  }>;
  updateTag: (tag: UpdateTagInputs) => Promise<{
    message: string;
    tag: Tag;
  }>;
}
