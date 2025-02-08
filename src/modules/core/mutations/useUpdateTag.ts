import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagGateway } from "@/modules/core/gateway-infra/api.tag-gateway";
import { UpdateTagDto } from "@/modules/core/model/Tag";

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tag: UpdateTagDto) => tagGateway.updateTag(tag),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["tags"],
        });
      }
    },
  });
}
