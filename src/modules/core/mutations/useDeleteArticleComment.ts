import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

export function useDeleteArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      articleCommentId,
    }: {
      articleId: string;
      articleCommentId: string;
    }) => articleGateway.deleteArticleComment(articleId, articleCommentId),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["article-comments", variables.articleId],
        });
      }
    },
  });
}
