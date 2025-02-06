"use client";

import { useParams } from "next/navigation";
import useArticle from "@/modules/react/hooks/use-article";

const Article = () => {
  const { slug } = useParams();

  const { data: article } = useArticle(slug as string);

  if (!article) return null;

  return (
    <div className="container mx-auto flex flex-col gap-2 mt-2 px-4 sm:px-0">
      <h1>{article.title}</h1>
    </div>
  );
};

export default Article;
