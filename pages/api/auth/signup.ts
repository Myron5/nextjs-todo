import { v4 as uuid } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";

import { User, UserEntityType } from "@/lib/entities/User";
import { TypeUserSchema, userSchema } from "@/lib/schemas/backend/userSchema";
import { validateBody } from "@/lib/utils/backend/validator";
import { alreadyExist } from "@/lib/utils/backend/isExist";
import UserService from "@/lib/services/backend/user";
import MailService from "@/lib/services/backend/mail";

import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";

const signUp = async (
  req: NextApiRequest,
  res: NextApiResponse<void | ResponseDataError>
) => {
  const { email, password } = req.body;

  validateBody<TypeUserSchema>(req, res, userSchema);
  await alreadyExist<UserEntityType, typeof email>(res, User, "email", email);

  const newUser = await UserService.create({
    email,
    password,
    verifToken: uuid(),
  });

  MailService.sendConfirmEmail(email, newUser.verifToken);

  res.status(201).send();
};

export default tryCatchWrapper<typeof signUp>(signUp);
