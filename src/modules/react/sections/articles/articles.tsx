import ArticlesHeader from "@/modules/react/sections/articles/_components/articles-header";
import ArticleCards from "@/modules/react/sections/articles/_components/article-cards";

const Articles = () => {
  return (
    <div className="container mx-auto flex flex-col gap-2 mt-2 px-4 sm:px-0">
      <ArticlesHeader />
      <ArticleCards />
    </div>
  );
};

export default Articles;
