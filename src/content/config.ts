import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string().max(60, {
        message: "Title must be 60 characters or less.",
      }),
      description: z.string().max(160, {
        message: "Description must be 160 characters or less.",
      }),
      date: z.date(),
      tags: z.array(z.string()),
      image: z
        .object({
          url: z.string(),
          alt: z.string(),
        })
        .optional(),
    }),
  }),
};
