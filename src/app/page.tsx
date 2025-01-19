import { ApiPostGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import HomePage from "@mm/modules/react/pages/HomePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const getPosts = async () => {
  const postGateway = new ApiPostGateway();
  const response = await postGateway.getPosts();
  return response;
};

export default function Home() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
