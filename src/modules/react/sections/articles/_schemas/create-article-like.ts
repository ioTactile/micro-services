import { z } from "zod";

export const createOrDeleteArticleLikeSchema = z.object({
  articleId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type CreateOrDeleteArticleLikeInputs = z.infer<
  typeof createOrDeleteArticleLikeSchema
>;
