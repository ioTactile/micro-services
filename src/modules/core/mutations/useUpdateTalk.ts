import { useMutation } from "@tanstack/react-query";
import { UpdateTalkDto } from "@/modules/core/model/Talk";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";

export function useUpdateTalk() {
  return useMutation({
    mutationFn: (talk: UpdateTalkDto) => talkGateway.updateTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      }
    },
  });
}
