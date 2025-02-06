import { z } from "zod";

export const deleteTagSchema = z.object({
  id: z.string().cuid(),
});

export type DeleteTagInputs = z.infer<typeof deleteTagSchema>;
