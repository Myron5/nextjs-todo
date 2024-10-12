import type { NextApiRequest, NextApiResponse } from "next";

import UserService from "@/lib/services/backend/user";
import {
  TypeResetPasswordSchema,
  resetPasswordSchema,
} from "@/lib/schemas/backend/userSchema";
import { validateBody } from "@/lib/utils/backend/validator";

import typeGuard from "@/lib/utils/backend/reqQueryTypeguard";
import { HttpError } from "@/lib/utils/backend/HttpError";
import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";

export const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse<void | ResponseDataError>
) => {
  const resetPassToken = typeGuard(req.query.resetPassToken);
  const { newpassword } = req.body;

  validateBody<TypeResetPasswordSchema>(req, res, resetPasswordSchema);

  const user = await UserService.changePassword({
    resetPassToken: resetPassToken,
    password: newpassword,
  });
  if (!user) {
    HttpError(res, 404, "User not found");
    return;
  }

  res.send();
};

export default tryCatchWrapper<typeof changePassword>(changePassword);
