import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import { GetPostWithComments } from "@mm/modules/core/queries/getPostWithComments";
import { useQuery } from "@tanstack/react-query";

const usePostComments = (postId: string) => {
  return useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => new GetPostWithComments(postGateway).execute(postId),
  });
};

export default usePostComments;
