import { GetArticleResponse } from "@/modules/core/model/Article";
import { useUserStore } from "@/modules/core/store/store";

type ArticleLikeStatus = {
  isLiked: boolean;
  likesCount: number;
};

const useArticleLikeStatus = (
  article: GetArticleResponse
): ArticleLikeStatus => {
  const { user } = useUserStore();

  return {
    isLiked:
      article.articleLikes?.some((like) => like.userId === user?.id) ?? false,
    likesCount: article._count.articleLikes,
  };
};

export default useArticleLikeStatus;
