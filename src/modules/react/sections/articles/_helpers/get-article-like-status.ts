import { GetArticleResponse } from "@/modules/core/model/Article";

type ArticleLikeStatus = {
  isLiked: boolean;
  likesCount: number;
};

const getArticleLikeStatus = (
  article: GetArticleResponse,
  userId?: string
): ArticleLikeStatus => {
  return {
    isLiked:
      article.articleLikes?.some((like) => like.userId === userId) ?? false,
    likesCount: article._count.articleLikes,
  };
};

export default getArticleLikeStatus;
