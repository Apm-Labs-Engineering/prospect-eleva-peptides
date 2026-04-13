import z from "zod";

export const contactFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  message: z.string(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
