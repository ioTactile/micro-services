import { z } from "zod";

export const updateArticleCommentSchema = z.object({
  content: z.string().min(1, "Veuillez remplir ce champ"),
});

export type UpdateArticleInputs = z.infer<typeof updateArticleCommentSchema>;
