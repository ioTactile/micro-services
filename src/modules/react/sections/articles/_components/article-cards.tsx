"use client";

import * as React from "react";
import useArticles from "@/modules/core/hooks/use-articles";
import ArticleCard from "@/modules/react/sections/articles/_components/article-card";
import { Separator } from "@/app/_components/ui/separator";

const ArticleCards = () => {
  const { data: articles } = useArticles();

  return (
    <div className="flex flex-col">
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
