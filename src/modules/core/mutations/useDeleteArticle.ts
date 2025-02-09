import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleGateway.deleteArticle(id),
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
