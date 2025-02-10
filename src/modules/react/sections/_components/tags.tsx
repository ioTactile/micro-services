import { GetArticleResponse } from "@/modules/core/model/Article";
import Tag from "@/modules/react/sections/_components/tag";

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
