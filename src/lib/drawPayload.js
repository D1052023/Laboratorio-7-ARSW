import { z } from "zod"

export const drawPayloadSchema = z.object({

  author: z.string().min(1),

  name: z.string().min(1),

  point: z.object({
    x: z.number(),
    y: z.number()
  })

})