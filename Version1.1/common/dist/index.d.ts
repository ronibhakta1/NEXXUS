import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    name: string;
    phone?: string | undefined;
}, {
    username: string;
    password: string;
    email: string;
    name: string;
    phone?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
}, {
    username: string;
    password: string;
    email: string;
}>;
export declare const createEcho: z.ZodObject<{
    content: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    content: string;
}, {
    username: string;
    content: string;
}>;
export declare const updateEcho: z.ZodObject<{
    content: z.ZodString;
    username: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    content: string;
    id: number;
}, {
    username: string;
    content: string;
    id: number;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateEcho = z.infer<typeof createEcho>;
export type UpdateEcho = z.infer<typeof updateEcho>;
