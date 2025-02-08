import { GetArticleResponse } from "@/modules/core/model/Article";
import { getTimeBetweenDateAndNow } from "@/modules/core/utils/date";
import { getCapitalize } from "@/modules/core/utils/string";
import { useRouter } from "next/navigation";
import Avatar from "@/modules/react/sections/_components/avatar";
import { Button } from "@/app/_components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/app/_hooks/use-toast";

interface ArticleCardProps {
  article: GetArticleResponse;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();

  const { toast } = useToast();

  function handleShare(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/blog/${article.slug}`
    );

    toast({
      title: "Succès",
      description: "Le lien a été copié dans le presse-papiers",
    });
  }

  return (
    <div
      className="flex flex-col gap-2 bg-card rounded-xl text-card-foreground px-4 py-1 my-1 cursor-pointer hover:bg-accent/20 transition-all duration-300"
      onClick={() => router.push(`/blog/${article.slug}`)}
    >
      <div className="flex items-center gap-1 text-xs">
        <Avatar
          alt={article.author.name}
          src={article.author.imageUrl}
          className="w-6 h-6"
        />

        <span className="font-bold">
          {getCapitalize(article.author.name ?? "")}
        </span>

        <span>•</span>

        <span className="text-muted-foreground">
          il y a {getTimeBetweenDateAndNow(article.updatedAt)}
        </span>
      </div>

      <span className="text-lg font-semibold">{article.title}</span>

      <p>{article.excerpt}</p>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="rounded-full">
          <Heart className="w-4 h-4" />
          {article._count.articleLikes}
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <MessageCircle className="w-4 h-4" />
          {article._count.articleComments}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Partager
        </Button>
      </div>
    </div>
  );
};

export default ArticleCard;
