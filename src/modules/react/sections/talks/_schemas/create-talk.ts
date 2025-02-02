import { z } from "zod";

export const createTalkSchema = z.object({
  title: z
    .string()
    .min(1, "Veuillez remplir ce champ")
    .max(300, "300 caractères maximum"),
  content: z.string().nullable(),
});

export type CreateTalkFormData = z.infer<typeof createTalkSchema>;
