import getArticleBySlug from "@/modules/core/queries/get-article-by-slug";
import { useQuery } from "@tanstack/react-query";

const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["articles", slug],
    queryFn: () => getArticleBySlug(slug),
  });
};

export default useArticleBySlug;
