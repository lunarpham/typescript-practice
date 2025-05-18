interface PersonModel {
  name: string;
  age: number;
  isValidated: boolean;
}

interface UserModel extends PersonModel {
  role: UserRole;
  permissions?: Permission[];
}

enum Permission {
  "UPLOAD_POST",
  "EDIT_POST",
  "DELETE_POST",
  "RESTRICT_USER",
  "DELETE_USER",
}

enum UserRole {
  "ADMIN",
  "USER",
}

// create an object type with key of type (Permission) and values of type (Description)
const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  [Permission.UPLOAD_POST]: "Can upload new posts",
  [Permission.EDIT_POST]: "Can edit existing posts",
  [Permission.DELETE_POST]: "Can delete posts",
  [Permission.RESTRICT_USER]: "Can restrict user access",
  [Permission.DELETE_USER]: "Can delete users",
};

class Person {
  protected fullName: string;
  // protected is safer, since it can be accessed from inherited classes,
  // take look at below User class, it can be called in updateUser function
  // private: accessible only within one class, not in derived classes
  // readonly (read-only): accessible in inherited classes but cannot be modified
  // public: accessible outside classes
  protected age: number;
  protected isValidated: boolean;

  //since this is a base class, protected is fine for inheritance

  // constructor is where the parsed params being constructed
  // and assign the value to above constanted variables
  constructor({ name, age, isValidated }: PersonModel) {
    this.fullName = name;
    this.age = age;
    this.isValidated = isValidated;
  }

  // methods go here
  getPerson(): PersonModel {
    return {
      name: this.fullName,
      age: this.age,
      isValidated: this.isValidated,
    };
  }
}

class User extends Person {
  private role: UserRole;
  private permissions: Permission[];

  constructor({ name, age, isValidated, role, permissions }: UserModel) {
    // super to call a constructor with base props from class Person
    // 3 below values is inherited from Person class
    super({ name, age, isValidated });

    // These two below variables are for this class only
    this.role = role;
    this.permissions = permissions || [];
  }

  // get full info with all fields in UserModel
  getUser(): UserModel & { permissions: Permission[] } {
    return {
      ...this.getPerson(), // Person class's methods can be accessible here
      role: this.role,
      permissions: this.permissions,
    };
  }

  // pick: select specific fields
  getBasicInfo(): Pick<UserModel, "name" | "age"> {
    return {
      name: this.fullName,
      age: this.age,
    };
  }

  // read-only: cannot assigned change to its fields again
  // the Object returned is locked (freeze)
  getStaticUserInfo(): Readonly<UserModel> {
    return Object.freeze({
      name: this.fullName,
      age: this.age,
      isValidated: this.isValidated,
      role: this.role,
      permissions: [...this.permissions],
    });
  }

  // partial: this is useful when updating, the params does not have to fully insert
  // if there is no Partial, the params must contains all defined fields
  updateUser(userData: Partial<UserModel>): void {
    if (userData.name) this.fullName = userData.name;
    if (userData.age) this.age = userData.age;
    if (userData.isValidated !== undefined)
      this.isValidated = userData.isValidated;
    if (userData.role !== undefined) this.role = userData.role;
    if (userData.permissions) this.permissions = userData.permissions;
  }

  // partial in record
  getUserPermissions(): Partial<Record<Permission, string>> {
    const userPermissions: Partial<Record<Permission, string>> = {};
    for (const permission of this.permissions) {
      userPermissions[permission] = PERMISSION_DESCRIPTIONS[permission];
    }

    return userPermissions;
  }

  addPermission(permission: Permission): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission: Permission): void {
    const index = this.permissions.indexOf(permission);
    if (index !== -1) {
      this.permissions.splice(index, 1);
    }
  }

  filterByKey<T extends Record<string, any>>(
    arr: T[], // array of object to filter
    key: keyof T, // property name, must exist in the object type
    value: any
  ) {
    return arr.filter((item) => item[key] === value);
  }
}

class Admin extends Person {
  private permissions: Permission[];

  constructor(
    { name, age, isValidated }: PersonModel,
    permissions?: Permission[]
  ) {
    super({ name, age, isValidated });
    this.permissions =
      permissions ||
      (Object.values(Permission).filter(
        (p) => typeof p === "number"
      ) as Permission[]);
  }

  getAdmin(): PersonModel & { permissions: Permission[] } {
    return {
      ...this.getPerson(),
      permissions: this.permissions,
    };
  }

  getAdminPermissions() {
    const permissionsWithDescriptions = this.permissions.reduce(
      (acc, permission) => {
        acc[permission] = PERMISSION_DESCRIPTIONS[permission];
        return acc;
      },
      {} as Partial<Record<Permission, string>>
    );

    return permissionsWithDescriptions;
  }
}

// Example functions
function createUser() {
  const exampleUser = new User({
    name: "John Doe",
    age: 30,
    isValidated: true,
    role: UserRole.USER,
    permissions: [Permission.UPLOAD_POST, Permission.EDIT_POST],
  });
  console.log("User details: ", exampleUser.getUser());

  exampleUser.addPermission(Permission.DELETE_POST);
  console.log("Updated user details with permissions: ", exampleUser.getUser());

  exampleUser.updateUser({
    name: "Tralalero Tralala",
    age: 56,
  });
  console.log("Updated user details: ", exampleUser.getUser());
  console.log("User basic info: ", exampleUser.getBasicInfo());
  const staticUserInfo = exampleUser.getStaticUserInfo();
  console.log("Static user info: ", staticUserInfo);
  // staticUserInfo.age = 50;
  console.log("Permissions: ", exampleUser.getUserPermissions());

  const userList = [
    { name: "John", age: 30, isValidated: true },
    { name: "Jane", age: 25, isValidated: false },
    { name: "Doe", age: 40, isValidated: true },
  ];

  const filteredUsers = exampleUser.filterByKey(userList, "isValidated", true);
  console.log("Filtered users: ", filteredUsers);
}

function createAdmin() {
  const exampleAdmin = new Admin({
    name: "John Smith",
    age: 35,
    isValidated: true,
  });

  console.log("Admin details: ", exampleAdmin.getAdmin());

  const customAdmin = new Admin(
    {
      name: "Lunar",
      age: 18,
      isValidated: true,
    },
    [Permission.RESTRICT_USER, Permission.DELETE_USER]
  );

  console.log("Moderator details: ", customAdmin.getAdmin());
}

createUser();
createAdmin();

function wrap<T>(value: T): { value: T } {
  return { value };
}

function demoGenericWrapper() {
  const wrappedPermission = wrap(Permission.EDIT_POST);
  console.log(
    "Wrapped permission: ",
    wrappedPermission.value,
    "Description: ",
    PERMISSION_DESCRIPTIONS[wrappedPermission.value]
  );

  const wrappedUser = wrap<UserModel>({
    name: "Jane Doe",
    age: 28,
    isValidated: true,
    role: UserRole.USER,
    permissions: [Permission.EDIT_POST],
  });
  console.log(
    "Wrapped user: ",
    wrappedUser.value,
    "Permissions: ",
    wrappedUser.value.permissions?.map(
      (permission) => PERMISSION_DESCRIPTIONS[permission]
    )
  );
}
demoGenericWrapper();

interface GenericInterface<T> {
  add(item: T): void;
  get(id: number): T | undefined;
  getAll(): T[];
  update(id: number, item: T): void;
  delete(id: number): boolean;
}
class GenericRepository<T extends { id?: number }>
  implements GenericInterface<T>
{
  private items: T[] = [];
  private nextId: number = 1;

  add(item: T): void {
    const newItem = { ...item, id: item.id || this.nextId++ };
    this.items.push(newItem as T);
  }

  get(id: number): T | undefined {
    return this.items[id];
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, item: T): boolean {
    // Find the index of the item with the given id
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) {
      return false; // Item not found
    }
    this.items[index] = { ...this.items[index], ...item };
    return true; // Update successful
  }

  delete(id: number): boolean {
    // Find the index of the item with the given id
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) {
      return false; // Item not found
    }
    this.items.splice(index, 1);
    return true; // Deletion successful
  }
}

function demoGenericRepository() {
  interface UserWithId extends UserModel {
    id?: number;
  }

  const userRepo = new GenericRepository<UserWithId>();

  userRepo.add({
    name: "Alice",
    age: 25,
    isValidated: true,
    role: UserRole.USER,
    permissions: [Permission.EDIT_POST],
  });
  userRepo.add({
    name: "Bob",
    age: 30,
    isValidated: true,
    role: UserRole.ADMIN,
    permissions: [Permission.UPLOAD_POST, Permission.DELETE_POST],
  });

  console.log("All users: ", userRepo.getAll());
}

demoGenericRepository();
