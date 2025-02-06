import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { CreateTalkDto } from "@/modules/core/model/Talk";

export function useCreateTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (talk: CreateTalkDto) => talkGateway.createTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["talks"] });
      }
    },
  });
}
