import getArticle from "@/modules/core/queries/get-article";
import { getIdFromSlug } from "@/modules/core/utils/string";
import { useQuery } from "@tanstack/react-query";

const useArticle = (slug: string) => {
  const id = getIdFromSlug(slug);

  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticle(id),
  });
};

export default useArticle;
