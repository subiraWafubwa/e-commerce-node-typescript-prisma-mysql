import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{6,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number or symbol.",
    }),
});
