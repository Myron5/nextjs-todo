import { NextApiResponse } from "next";

import ResponseDataError from "@/lib/types/responseDataError";
import { HttpError } from "./HttpError";

interface EntityGeneric {
  findOne: Function;
}

export const alreadyExist = async <E extends EntityGeneric, V>(
  res: NextApiResponse<ResponseDataError>,
  entity: E,
  key: string,
  value: V
) => {
  const alreadyExist = Boolean(
    await entity.findOne({ where: { [key]: value } })
  );
  if (alreadyExist) {
    HttpError(res, 400, `Entity with ${key} : ${value} already exist`);
  }
};

export const doesntExist = async <E extends EntityGeneric, V>(
  res: NextApiResponse<ResponseDataError>,
  entity: E,
  key: string,
  value: V
) => {
  const alreadyExist = Boolean(
    await entity.findOne({ where: { [key]: value } })
  );
  if (!alreadyExist) {
    HttpError(res, 400, `Entity with ${key} : ${value} doesn't exist`);
  }
};
