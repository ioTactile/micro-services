import { articleGateway } from "@/modules/core/gateway-infra/api.article.gateway";

const getArticle = async (id: string) => {
  return await articleGateway.getArticle(id);
};

export default getArticle;
