export const LOCALSTORAGE_NAME_JWTTOKEN = "jwt_token";
export const TODOS_LIMIT_PER_PAGE = 2;

export const QUERY_KEYS = {
  USER: "user",
  TODO: "todo",
  TODOS: "todos",
};

export const MOBILE = 320;
export const TABLET = 425;
export const DESKTOP = 768;

export type TypeSizes = "sm" | "md" | "lg";
interface ISizes {
  SM: TypeSizes;
  MD: TypeSizes;
  LG: TypeSizes;
}

export const SIZES: ISizes = {
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export const API_KEYS = {
  AUTH_SIGNUP: "/auth/signup",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  AUTH_RESET_PASSWORD_TOKEN: "/auth/reset-password/:resetPassToken",
  AUTH_VERIFY_EMAIL_TOKEN: "auth/verify-email/:confirmToken",

  TODO_GETALL_POST: "todo",
  TODO_GETONE_PUT_DELETE: "todo/:todoId",
};

export const ROUTER_KEYS = {
  ROOT: "/",

  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  RESET_PASSWORD: "/auth/reset-password",
  RESET_PASSWORD_TOKEN: "/auth/reset-password/:resetPassToken",
  VERIFY_EMAIL_TOKEN: "auth/verify-email/:confirmToken",

  TODO: "/todo",
  TODO_DETAILS: "/todo/:todoId",
  CREATE_TODO: "/todo/create",
};

export const BAGES = ["All", "Private", "Public", "Completed"] as const;
export type TypeBages = (typeof BAGES)[number];
