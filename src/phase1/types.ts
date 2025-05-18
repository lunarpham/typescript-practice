// 3 specific types
let fullName1: string = "Sakiko";
let age: number = 25;
let isThisRealChat: boolean = true;

// any: Can be anything
let yoWhatIsThis: any = ["abcd", "xyz"];
yoWhatIsThis = 56;
yoWhatIsThis = "I may cry";

// unknown: safer alt to any
let unknownValue: unknown = 36;
if (typeof unknownValue === "number") {
  console.log("Value is number");
}

// void: for function, return nothing
function logMessage(): void {
  console.log("hello world"); // this is fine
}

// never: for function, never return (throw errors, infinite loops,...)
function throwError(): never {
  throw new Error("error");
}

// union types
type StringOrNumber = string | number;
let flexible: StringOrNumber = "hello";
flexible = 36;
