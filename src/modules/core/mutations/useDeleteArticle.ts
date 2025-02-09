import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { DeleteArticleDto } from "@/modules/core/model/Article";
export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: DeleteArticleDto) =>
      articleGateway.deleteArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
      }
    },
  });
}
