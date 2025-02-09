import { useQuery } from "@tanstack/react-query";
import getArticleById from "@/modules/core/queries/get-article-by-id";

const useArticleById = (id: string) => {
  return useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticleById(id),
  });
};

export default useArticleById;
