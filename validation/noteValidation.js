import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1).max(50, 'Title must be 50 characters or less'),
  text: z.string().min(1).max(300, 'Text must be 300 characters or less'),
});

export const noteUpdateSchema = z.object({
  id: z.string().uuid("Invalid note ID format"),
  title: z.string().max(50, "Title must be 50 characters or fewer").optional(),
  text: z.string().max(300, "Text must be 300 characters or fewer").optional(),
}).refine(data => data.title !== undefined || data.text !== undefined, {
  message: "At least one of title or text must be provided",
});

export const noteDeleteSchema = z.object({
  id: z.string().uuid({
    message: "Invalid note ID format",
  }),
});
