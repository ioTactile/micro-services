import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagGateway } from "@/modules/core/gateway-infra/api.tag-gateway";

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tagGateway.deleteTag(id),
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
