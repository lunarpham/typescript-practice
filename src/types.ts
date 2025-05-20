interface User {
  id: number;
  name: string;
  email?: string;
  role: "user" | "admin";
  permissions?: Permissions[];
  createdAt?: Date;
}

enum Permissions {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  MANAGE = "manage",
}

const PermissionDescriptions: Record<Permissions, string> = {
  [Permissions.READ]: "Allows viewing resources",
  [Permissions.WRITE]: "Allows creating and updating resources",
  [Permissions.DELETE]: "Allows removing resources",
  [Permissions.MANAGE]: "Allows managing all resources and users",
};

function getPermissionDescription(permission: Permissions): string {
  return PermissionDescriptions[permission];
}

function isUser(obj: unknown): obj is User {
  if (!obj || typeof obj !== "object" || obj === null) {
    return false;
  }

  const hasValidPermissions =
    !("permissions" in obj) ||
    (Array.isArray((obj as Record<string, unknown>).permissions) &&
      ((obj as Record<string, unknown>).permissions as unknown[]).every(
        (perm) => Object.values(Permissions).includes(perm as Permissions)
      ));

  return (
    "id" in obj &&
    typeof (obj as Record<string, unknown>).id === "number" &&
    "name" in obj &&
    typeof (obj as Record<string, unknown>).name === "string" &&
    (!("email" in obj) ||
      typeof (obj as Record<string, unknown>).email === "string") &&
    "role" in obj &&
    ["user", "admin"].includes(
      (obj as Record<string, unknown>).role as string
    ) &&
    hasValidPermissions &&
    (!("createdAt" in obj) ||
      (obj as Record<string, unknown>).createdAt instanceof Date)
  );
}

export { User, isUser, Permissions, getPermissionDescription };
