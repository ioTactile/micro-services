import getArticles from "@/modules/core/queries/get-articles";
import ArticlesPage from "@/modules/react/pages/ArticlesPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Articles() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesPage />
    </HydrationBoundary>
  );
}
