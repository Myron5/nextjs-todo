import { NextApiRequest, NextApiResponse } from "next";

import ResponseDataError from "@/lib/types/responseDataError";
import { HttpError } from "./HttpError";

interface SchemaGenerik {
  validate: Function;
}

export function validateBody<S extends SchemaGenerik>(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataError>,
  schema: S
) {
  const schemaValidationResult = schema.validate(req.body);
  if (schemaValidationResult.error) {
    HttpError(res, 400, schemaValidationResult.error.details[0].message);
  }
}

const getSearchParamsObj = (urlStr: string) => {
  const url = new URL(urlStr);
  const searchParams = new URLSearchParams(url.search);

  const params: Record<string, string> = {};
  searchParams.forEach((value: string, key: string) => {
    params[key] = value;
  });
};

export function validateQueryParams<S extends SchemaGenerik>(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataError>,
  schema: S
) {
  const body = getSearchParamsObj(req.url!);
  const schemaValidationResult = schema.validate(body);
  if (schemaValidationResult.error) {
    HttpError(res, 400, schemaValidationResult.error.details[0].message);
  }
}
