import { NextApiResponse } from "next";
import ResponseDataError from "@/lib/types/responseDataError";

const errorMessageList = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  405: "Method Not Allowed",
  409: "Conflict",
  503: "Service Unavailable",
};

export const HttpError = (
  res: NextApiResponse<ResponseDataError>,
  status: string | number,
  message: string = errorMessageList[status as keyof typeof errorMessageList]
) => {
  res.status(Number(status)).json({ message });
};
