import { articleGateway } from "@/modules/core/gateway-infra/api.article.gateway";

const getArticles = async () => {
  return await articleGateway.getArticles();
};

export default getArticles;
