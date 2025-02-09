import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";

export function useDeleteTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => talkGateway.deleteTalk(id),
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
