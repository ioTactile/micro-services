import { TALK_TITLE_MAX_LENGTH } from "@/app/_constants/app";
import { z } from "zod";

export const createTalkCommentSchema = z.object({
  content: z.string().min(1).max(TALK_TITLE_MAX_LENGTH),
});

export type CreateTalkCommentInputs = z.infer<typeof createTalkCommentSchema>;
