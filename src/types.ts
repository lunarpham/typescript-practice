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

function isUser(obj: any): obj is User {
  const hasValidPermissions =
    !obj.permissions ||
    (Array.isArray(obj.permissions) &&
      obj.permissions.every((perm: any) =>
        Object.values(Permissions).includes(perm)
      ));

  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    (obj.email === undefined || typeof obj.email === "string") &&
    ["user", "admin"].includes(obj.role) &&
    hasValidPermissions &&
    (obj.createdAt === undefined || obj.createdAt instanceof Date)
  );
}

export { User, isUser, Permissions, getPermissionDescription };
