import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTagResponse, GetTagsResponse } from "@/modules/core/model/Tag";
import getTag from "@/modules/core/queries/get-tag";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["tags", id],
    queryFn: () => getTag(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le tag depuis la liste complète des tags
      const tags = queryClient.getQueryData<GetTagsResponse>(["tags"]);
      if (tags) {
        return tags.find((tag) => tag.id === id);
      }

      // Sinon, essayer de récupérer directement le tag individuel
      return queryClient.getQueryData<GetTagResponse>(["tags", id]);
    },
  });
};
