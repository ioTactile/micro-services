import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

const getArticles = async (userId?: string) => {
  return await articleGateway.getArticles(userId);
};

export default getArticles;
