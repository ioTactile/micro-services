import { useMutation } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { UpdateArticleDto } from "@/modules/core/model/Article";

export function useUpdateArticle() {
  return useMutation({
    mutationFn: (article: UpdateArticleDto) =>
      articleGateway.updateArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      }
    },
  });
}
