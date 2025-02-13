import * as React from "react";
import { useCreateArticleLike } from "@/modules/core/mutations/useCreateArticleLike";
import { useDeleteArticleLike } from "@/modules/core/mutations/useDeleteArticleLike";
import { useAuthAction } from "@/app/_hooks/use-auth-action";

const useArticleLike = (
  articleId: string,
  isLiked: boolean,
  userId?: string
) => {
  const createLikeMutation = useCreateArticleLike();
  const deleteLikeMutation = useDeleteArticleLike();
  const { handleAuthAction } = useAuthAction();

  const handletoggleLike = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      handleAuthAction(() => {
        if (isLiked) {
          deleteLikeMutation.mutate({ articleId, userId: userId! });
        } else {
          createLikeMutation.mutate({ articleId, userId: userId! });
        }
      });
    },
    [articleId, userId, isLiked, createLikeMutation, deleteLikeMutation]
  );

  return { handletoggleLike };
};

export default useArticleLike;
