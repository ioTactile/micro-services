import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTalkResponse, GetTalksResponse } from "@/modules/core/model/Talk";
import getTalkWithComments from "@/modules/core/queries/get-talk-with-comments";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["talks", id],
    queryFn: () => getTalkWithComments(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le tag depuis la liste complète des tags
      const talks = queryClient.getQueryData<GetTalksResponse>(["talks"]);
      if (talks) {
        return talks.find((talk) => talk.id === id);
      }

      // Sinon, essayer de récupérer directement le tag individuel
      return queryClient.getQueryData<GetTalkResponse>(["talks", id]);
    },
  });
};
