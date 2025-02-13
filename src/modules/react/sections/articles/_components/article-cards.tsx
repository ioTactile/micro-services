"use client";

import * as React from "react";
import useArticles from "@/modules/core/hooks/use-articles";
import ArticleCard from "@/modules/react/sections/articles/_components/article-card";
import { Separator } from "@/app/_components/ui/separator";
import { useUserStore } from "@/modules/core/store/store";

const ArticleCards = () => {
  const { user } = useUserStore();
  const { data: articles } = useArticles(user?.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles?.map((article, index) => (
        <React.Fragment key={article.slug}>
          <ArticleCard article={article} />
          {index < articles.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ArticleCards;
