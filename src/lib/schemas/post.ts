import { z } from 'zod'

export const postSchema = z.object({
  content: z.string().min(1).max(280),
})

export type PostSchema = typeof postSchema
