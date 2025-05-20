import { User, isUser, Permissions, getPermissionDescription } from "./types";
import { validateUser } from "./validators";
import { formatName } from "./utils/formatName";

export function processUser(input: unknown): User {
  if (!isUser(input)) {
    throw new Error("Invalid user object");
  }
  const validatedUser = validateUser(input);
  console.log(`Processed user: ${formatName(validatedUser.name, "Doe")}`);

  if (validatedUser.permissions && validatedUser.permissions.length > 0) {
    console.log("User permissions:");
    validatedUser.permissions.forEach((permission) => {
      console.log(`- ${permission}: ${getPermissionDescription(permission)}`);
    });
  } else {
    console.log("User has no permissions assigned");
  }

  return validatedUser;
}

const exampleInput = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  permissions: [Permissions.READ, Permissions.WRITE, Permissions.MANAGE],
  createdAt: new Date(),
};

try {
  const user = processUser(exampleInput);
  console.log("User processed successfully:", user);
} catch (error) {
  if (error instanceof Error) {
    console.error("Error processing user:", error.message);
  }
}
