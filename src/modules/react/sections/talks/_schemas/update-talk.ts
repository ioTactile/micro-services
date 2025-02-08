import { TALK_TITLE_MAX_LENGTH } from "@/app/_constants/app";
import { z } from "zod";

export const updateTalkSchema = z.object({
  title: z
    .string()
    .min(1, "Veuillez remplir ce champ")
    .max(TALK_TITLE_MAX_LENGTH, "300 caractères maximum"),
  content: z.string().nullable(),
});

export type UpdateTalkInputs = z.infer<typeof updateTalkSchema>;
