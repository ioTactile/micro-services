import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { CreateOrDeleteArticleLikeInputs } from "@/modules/react/sections/articles/_schemas/create-article-like";

export function useCreateArticleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleLike: CreateOrDeleteArticleLikeInputs) =>
      articleGateway.createArticleLike(articleLike),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["article", variables.articleId],
        });
      }
    },
  });
}
