import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { DeleteTalkDto } from "@/modules/core/model/Talk";

export function useDeleteTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (talk: DeleteTalkDto) => talkGateway.deleteTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks"],
        });
      }
    },
  });
}
