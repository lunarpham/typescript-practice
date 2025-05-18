// Numeric enums
enum Status {
  single,
  married,
}

enum Role {
  "ADMIN",
  "USER",
}

/* Define a type */
type BasePersonType = {
  age: number;
  name: string;
};

// "Type" has no declaration merging, if you want to merge, do this
type ExtendedPersonType = {
  isConfirmed: boolean;
  role: Role;
  status: Status;
} & BasePersonType;

// Using interface, in most cases, to define shape to and object
interface BasePersonInterface {
  age: number;
  name: string;
}

// Interface can be re-declared
interface BasePersonInterface {
  isConfirmed: boolean;
  role: Role;
  status: Status;
}

// Interface can be extended this way
interface ExtendedPersonInterface extends BasePersonInterface {
  isConfirmed: boolean;
  role: Role;
  status: Status;
}

function getUser1() {
  const user1: ExtendedPersonType = {
    age: 27,
    name: "Tung Tung Sahur",
    isConfirmed: true,
    role: Role.USER,
    status: Status.married,
  };
  console.log("Constant using Type: ", user1);
}

function getUser2() {
  const user2: ExtendedPersonInterface = {
    age: 13,
    name: "Tralalero Tralala",
    isConfirmed: false,
    role: Role.ADMIN,
    status: Status.single,
  };
  console.log("Constant using Interface: ", user2);
}

getUser1();
getUser2();
