import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateArticleCommentDto } from "@/modules/core/model/ArticleComment";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

export function useCreateArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleComment: CreateArticleCommentDto) =>
      articleGateway.createArticleComment(articleComment),
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
