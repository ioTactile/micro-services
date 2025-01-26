import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import { CreatePostCommentDto } from "@mm/modules/core/model/PostComment";

export function useCreatePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postComment: CreatePostCommentDto) =>
      postGateway.createPostComment(postComment),
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      }
    },
  });
}
