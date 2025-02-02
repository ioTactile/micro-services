import getTalkWithComments from "@/modules/core/queries/get-talk-with-comments";
import { useQuery } from "@tanstack/react-query";

const useTalkComments = (id: string) => {
  return useQuery({
    queryKey: ["talk-comments", id],
    queryFn: () => getTalkWithComments(id),
  });
};

export default useTalkComments;
