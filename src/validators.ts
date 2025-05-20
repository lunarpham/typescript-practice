import { z } from "zod";
import { User, Permissions } from "./types";

const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  role: z.enum(["user", "admin"]),
  permissions: z.array(z.nativeEnum(Permissions)).optional(),
  createdAt: z.date().optional(),
});

type UserInput = z.infer<typeof UserSchema>;

function validateUser(input: any): User {
  const result = UserSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.message}`);
  }
  return result.data;
}

export { UserSchema, validateUser, UserInput };
