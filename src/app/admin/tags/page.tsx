import getTags from "@/modules/core/queries/get-tags";
import AdminTagsPage from "@/modules/react/pages/AdminTagsPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminTags() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminTagsPage />
    </HydrationBoundary>
  );
}
