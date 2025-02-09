"use client";

import useTags from "@/modules/core/hooks/use-tags";
import TagsHeader from "@/modules/react/sections/admin/tags/_components/tags-header";
import { DataTable } from "@/modules/react/sections/admin/tags/_components/data-table";
import { columns } from "@/modules/react/sections/admin/tags/_components/columns";
import { getFormatedDate } from "@/modules/core/utils/date";

const Tags = () => {
  const { data: tags } = useTags();

  const tagsFormated = tags?.map((tag) => ({
    ...tag,
    createdAt: getFormatedDate(tag.createdAt),
    updatedAt: getFormatedDate(tag.updatedAt),
  }));

  if (!tagsFormated) return null;

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <TagsHeader />
      <DataTable columns={columns} data={tagsFormated} />
    </div>
  );
};

export default Tags;
