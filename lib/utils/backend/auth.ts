import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

import NextAuth from "@/pages/api/auth/[...nextauth]";
import ResponseDataError from "@/lib/types/responseDataError";
import { HttpError } from "./HttpError";

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataError>
) => {
  const session = (await getServerSession(
    req,
    res,
    NextAuth.authOptions
  )) as Session;

  if (!session || !session?.user?.id || !session?.user?.email) {
    HttpError(res, 401);
    return;
  }
  return session;
};

export default auth;
