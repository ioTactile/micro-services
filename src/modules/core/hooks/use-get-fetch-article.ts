import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetArticleResponse,
  GetArticlesResponse,
} from "@/modules/core/model/Article";
import getArticle from "@/modules/core/queries/get-article";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticle(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le tag depuis la liste complète des tags
      const articles = queryClient.getQueryData<GetArticlesResponse>([
        "articles",
      ]);
      if (articles) {
        return articles.find((article) => article.id === id);
      }

      // Sinon, essayer de récupérer directement le tag individuel
      return queryClient.getQueryData<GetArticleResponse>(["articles", id]);
    },
  });
};
