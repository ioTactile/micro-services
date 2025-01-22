import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import HomePage from "@mm/modules/react/pages/HomePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const getPosts = async () => {
  const response = await postGateway.getPosts();
  return response;
};

export default async function Home() {
  const queryClient = new QueryClient();

  const initialPosts = await getPosts();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: initialPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
