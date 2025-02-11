import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagGateway } from "@/modules/core/gateway-infra/api.tag-gateway";
import { useToast } from "@/app/_hooks/use-toast";

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => tagGateway.deleteTag(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la suppression du tag",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["tags"],
        });
        toast({
          title: "Tag supprimé avec succès",
          description: "Le tag a été supprimé avec succès",
        });
      }
    },
  });
}
