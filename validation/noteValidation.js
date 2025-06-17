import { z } from 'zod';

export const noteSchema = z.object({
    title: z
      .string({ message: "Title is required and must be a string" })
      .nonempty({ message: "Title is required" })
      .max(50, { message: "Title can't be longer than 50 characters" }),
    text: z
      .string({ message: "Text is required and must be a string" })
      .nonempty({ message: "Text is required" })
      .max(300, { message: "Text can't be longer than 300 characters" }),
  })
  .strict();

export const noteUpdateSchema = z.object({
    title: z
      .string({ message: "Title is required and must be a string" })
      .nonempty({ message: "Title is required" })
      .max(50, { message: "Title can't be longer than 50 characters" })
      .optional(),
    text: z
      .string({ message: "Text is required and must be a string" })
      .nonempty({ message: "Text is required" })
      .max(300, { message: "Text can't be longer than 300 characters" })
      .optional(),
  })
  .strict();

export const noteDeleteSchema = z.object({
  id: z.string().uuid({
    message: "Invalid note ID format",
  }),
});

export const noteSearchSchema = z.object({
  title: z.string().min(1, "Search query is required"),
});