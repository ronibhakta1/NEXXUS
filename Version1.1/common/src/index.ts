import z from "zod";

export const signupInput = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
})

export const signinInput = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
})

export const createEcho = z.object({
    content: z.string(),
})
export const updateEcho = z.object({
    content: z.string(),
    username: z.string(),
    id: z.number(),
})

//type interferance in zod

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateEcho = z.infer<typeof createEcho>
export type UpdateEcho = z.infer<typeof updateEcho>