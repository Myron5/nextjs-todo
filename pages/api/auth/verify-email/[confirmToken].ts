import type { NextApiRequest, NextApiResponse } from "next";

import UserService from "@/lib/services/backend/user";

import typeGuard from "@/lib/utils/backend/reqQueryTypeguard";
import { HttpError } from "@/lib/utils/backend/HttpError";
import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";
import { IUser } from "@/lib/types/user";

export const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | ResponseDataError>
) => {
  const confirmToken = typeGuard(req.query.confirmToken);

  const newUser = await UserService.confirmEmail(confirmToken);
  if (!newUser) {
    HttpError(res, 404, "Already verified");
    return;
  }

  const { verifToken, resetPassToken: _, ...newUserWithoutBackData } = newUser;
  res.json(newUserWithoutBackData);
};

export default tryCatchWrapper<typeof changePassword>(changePassword);
