import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { DeleteArticleCommentDto } from "@/modules/core/model/Article";

export function useDeleteArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleComment: DeleteArticleCommentDto) =>
      articleGateway.deleteArticleComment(articleComment),

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
