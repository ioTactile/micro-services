import getArticles from "@/modules/core/queries/get-articles";
import AdminArticlesPage from "@/modules/react/pages/AdminArticlesPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminBlog() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminArticlesPage />
    </HydrationBoundary>
  );
}
