import * as z from 'zod';

export const form1Schema  = z.object({
  projectName: z.string().trim().min(5, 'Project name must be at least 5 characters').max(20,'Project name should not more than 20 characters'),
  projectDescription: z.string().trim().min(10, 'Project description must be at least 10 characters')
})

export const form5Schema = z.object({
  clientEmail: z.string().email({ message: 'Please provide valid email'}).trim(),
  clientName: z.string().min(5, 'Client name must be at least 5 characters').trim()
})