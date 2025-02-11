import Tag from "@/modules/react/sections/_components/tag";
import { GetArticleResponse } from "@/modules/core/model/Article";

interface TagsProps {
  tags: GetArticleResponse["articleTags"];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Tag key={tag.tagId} name={tag.tag.name} />
      ))}
    </div>
  );
};

export default Tags;
