import ArticleForm from "@/modules/react/sections/admin/articles/_components/article-form";
import ArticlesHeader from "@/modules/react/sections/admin/articles/_components/articles-header";

const CreateArticle = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <ArticlesHeader />
      <ArticleForm mode="create" />
    </div>
  );
};

export default CreateArticle;
