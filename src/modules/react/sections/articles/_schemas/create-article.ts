import { TALK_TITLE_MAX_LENGTH } from "@/app/_constants/app";
import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Veuillez remplir ce champ")
    .max(TALK_TITLE_MAX_LENGTH, "300 caractères maximum"),
  content: z.string().min(1, "Veuillez remplir ce champ"),
  imageUrl: z.string().nullable(),
  imageName: z.string().nullable(),
  excerpt: z.string().nullable(),
  published: z.boolean().default(false),
  tags: z.array(z.string().cuid()),
});

export type CreateArticleInputs = z.infer<typeof createArticleSchema>;
