import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { DeleteTalkDto } from "@/modules/core/model/Talk";
import { useToast } from "@/app/_hooks/use-toast";

export function useDeleteTalk() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (talk: DeleteTalkDto) => talkGateway.deleteTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la suppression de la discussion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks"],
        });
        toast({
          title: "Discussion supprimée avec succès",
          description: "La discussion a été supprimée avec succès",
        });
      }
    },
  });
}
