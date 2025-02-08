import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { DeleteArticleCommentInputs } from "@/modules/react/sections/articles/_schemas/delete-article-comment";

export function useDeleteArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleComment: DeleteArticleCommentInputs) =>
      articleGateway.deleteArticleComment(
        articleComment.articleId,
        articleComment.articleCommentId
      ),

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
