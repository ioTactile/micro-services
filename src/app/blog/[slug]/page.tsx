import getArticle from "@/modules/core/queries/get-article";
import { getIdFromSlug } from "@/modules/core/utils/string";
import ArticlePage from "@/modules/react/pages/ArticlePage";
import { PageProps } from "@/types/pages-props";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Article({ params }: PageProps) {
  const slug = (await params).slug;
  const id = getIdFromSlug(slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlePage />
    </HydrationBoundary>
  );
}
