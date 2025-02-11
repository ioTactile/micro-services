import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

export function useDeleteArticleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      userId,
    }: {
      articleId: string;
      userId: string;
    }) => articleGateway.deleteArticleLike(articleId, userId),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["articles", variables.articleId],
        });
      }
    },
  });
}
