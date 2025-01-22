import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import { CreatePostDto } from "@mm/modules/core/model/Post";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: CreatePostDto) => postGateway.createPost(post),
    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
}
