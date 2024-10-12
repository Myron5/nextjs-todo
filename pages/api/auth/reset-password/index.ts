import { v4 as uuid } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";

import UserService from "@/lib/services/backend/user";
import MailService from "@/lib/services/backend/mail";
import {
  TypeSendResetPasswordSchema,
  sendResetPasswordSchema,
} from "@/lib/schemas/backend/userSchema";
import { validateBody } from "@/lib/utils/backend/validator";

import { HttpError } from "@/lib/utils/backend/HttpError";
import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";

export const resetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<void | ResponseDataError>
) => {
  const { email } = req.body;

  validateBody<TypeSendResetPasswordSchema>(req, res, sendResetPasswordSchema);

  const user = await UserService.setResetPassToken({
    email,
    resetPassToken: uuid(),
  });

  if (!user) {
    HttpError(res, 404, "User not found");
    return;
  }

  MailService.sendConfirmResetPassword(email, user.resetPassToken);

  res.send();
};

export default tryCatchWrapper<typeof resetPassword>(resetPassword);
