import { instance } from "./instance";
import { API_KEYS } from "@/lib/constants/default";
import { IUser } from "@/lib/types/user";

export const register = async (fullUser: IUser) => {
  const { email, password } = fullUser;
  const user = { email, password };
  const { data } = await instance.post("/api/user/register", user);
  return data;
};

export const sendResetPassword = async (body: { email: string }) => {
  const { data } = await instance.post(API_KEYS.AUTH_RESET_PASSWORD, body);
  return data;
};

export const resetPassword = async (payload: {
  resetPassToken: string;
  newpassword: string;
}) => {
  const { data } = await instance.post(
    API_KEYS.AUTH_RESET_PASSWORD_TOKEN.replace(
      ":resetPassToken",
      payload.resetPassToken
    ),
    {
      newpassword: payload.newpassword,
    }
  );
  return data;
};

export const confirmEmail = async (verifToken: string) => {
  const { data } = await instance.get(
    API_KEYS.AUTH_VERIFY_EMAIL_TOKEN.replace(":confirmToken", verifToken)
  );
  return data;
};
