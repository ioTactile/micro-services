import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";

export function useDeleteTalkComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      talkId,
      talkCommentId,
    }: {
      talkId: string;
      talkCommentId: string;
    }) => talkGateway.deleteTalkComment(talkId, talkCommentId),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks", variables.talkId],
        });
      }
    },
  });
}
