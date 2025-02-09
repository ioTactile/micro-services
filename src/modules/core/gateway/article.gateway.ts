import {
  CreateArticleDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  UpdateArticleDto,
  CreateArticleCommentDto,
  CreateOrDeleteArticleLikeDto,
  DeleteArticleCommentDto,
  DeleteArticleDto,
} from "@/modules/core/model/Article";

export interface IArticleGateway {
  getArticles: () => Promise<GetArticlesResponse>;
  getArticle: (id: string) => Promise<GetArticleResponse>;
  createArticle: (article: CreateArticleDto) => Promise<{
    message: string;
  }>;
  updateArticle: (article: UpdateArticleDto) => Promise<{
    message: string;
  }>;
  deleteArticle: (article: DeleteArticleDto) => Promise<{
    message: string;
  }>;
  getArticleComments: (id: string) => Promise<GetArticleCommentsResponse>;
  createArticleComment: (articleComment: CreateArticleCommentDto) => Promise<{
    message: string;
  }>;
  deleteArticleComment: (articleComment: DeleteArticleCommentDto) => Promise<{
    message: string;
  }>;
  createArticleLike: (articleLike: CreateOrDeleteArticleLikeDto) => Promise<{
    message: string;
  }>;
  deleteArticleLike: (articleLike: CreateOrDeleteArticleLikeDto) => Promise<{
    message: string;
  }>;
}
