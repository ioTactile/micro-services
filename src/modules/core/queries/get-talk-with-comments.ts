import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";

const getTalkWithComments = async (id: string) => {
  const talkPromise = talkGateway.getTalk(id);
  const commentsPromise = talkGateway.getTalkComments(id);
  const [talk, comments] = await Promise.all([talkPromise, commentsPromise]);
  return { ...talk, comments };
};

export default getTalkWithComments;
