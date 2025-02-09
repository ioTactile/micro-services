import getTalks from "@/modules/core/queries/get-talks";
import AdminTalksPage from "@/modules/react/pages/AdminTalksPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminTalks() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["talks"],
    queryFn: () => getTalks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminTalksPage />
    </HydrationBoundary>
  );
}
