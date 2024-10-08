import * as z from 'zod';

export const form1Schema  = z.object({
  projectName: z.string().trim().regex(/^\S+$/, "Please fill out the fields"),
  projectDescription: z.string().regex(/^\S+$/, "Please fill out the fields")
})

export const form5Schema = z.object({
  clientEmail: z.string().email({ message: 'Please provide valid email'}).trim(),
  clientName: z.string().trim()
})