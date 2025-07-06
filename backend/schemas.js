const zod=require("zod");

export const userSchema = zod.object({
    username: zod.string().min(3).max(30).toLowerCase(),
    firstname: zod.string().trim().max(50),
    lastname: zod.string().trim().max(50),
    password: zod.string().min(6),
});
export const updateUserSchema = zod.object({
    username: zod.string().min(3).max(30).toLowerCase(),
    firstname: zod.string().trim().min(1).max(50),
    lastname: zod.string().trim().optional().max(50),
});

export const userSigninSchema = zod.object({
    username: zod.string().min(3).max(30).toLowerCase(),
    password: zod.string().min(6),
});