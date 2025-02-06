import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagGateway } from "@/modules/core/gateway-infra/api.tag-gateway";
import { UpdateTagInputs } from "@/modules/react/sections/admin/tags/_schemas/update-tag";

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tag: UpdateTagInputs) => tagGateway.updateTag(tag),
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
