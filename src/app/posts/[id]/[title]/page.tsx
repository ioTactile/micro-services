import { postGateway } from "@mm/modules/core/gateway-infra/api.post-gateway";
import PostPage from "@mm/modules/react/pages/PostPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const getPost = async (id: string) => {
  const response = await postGateway.getPost(id);
  return response;
};

const getPostComments = async (id: string) => {
  const response = await postGateway.getPostComments(id);
  return response;
};

export default async function Post({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  const initialPost = await getPost(id);

  await queryClient.prefetchQuery({
    queryKey: ["post"],
    queryFn: () => getPost(id),
    initialData: initialPost,
  });

  const initialPostComments = await getPostComments(id);

  await queryClient.prefetchQuery({
    queryKey: ["post-comments"],
    queryFn: () => getPostComments(id),
    initialData: initialPostComments,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPage />
    </HydrationBoundary>
  );
}
