import type { NextApiRequest, NextApiResponse } from "next";

import { Todo } from "@/lib/entities/Todo";
import TodoService from "@/lib/services/backend/todo";
import { TypeTodoSchema, todoSchema } from "@/lib/schemas/backend/todoSchema";
import {
  TypeQueryParamsSchema,
  queryParamsSchema,
} from "@/lib/schemas/backend/queryParamsSchema";
import {
  validateBody,
  validateQueryParams,
} from "@/lib/utils/backend/validator";
import auth from "@/lib/utils/backend/auth";
import { BAGES, TypeBages } from "@/lib/constants/default";
import { ITodo } from "@/lib/types/todo";
import { IBackendTodoParams } from "@/lib/types/backendparams";

import { HttpError } from "@/lib/utils/backend/HttpError";
import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";
import typeGuard from "@/lib/utils/backend/reqQueryTypeguard";

/**
 * GET
 */

type paginationType = {
  todos: Todo[];
  total: number;
  totalPages: number;
  currentPage: number;
};
type typeGET = paginationType | ResponseDataError;

const GET = async (req: NextApiRequest, res: NextApiResponse<typeGET>) => {
  const session = await auth(req, res);
  const userId = session?.user.id as string;
  validateQueryParams<TypeQueryParamsSchema>(req, res, queryParamsSchema);
  const queryParams: IBackendTodoParams = {
    bage: typeGuard(req.query.bage || BAGES[0]) as TypeBages,
    search: typeGuard(req.query.search),
    limit: Number(req.query.limit || "10"),
    page: Number(req.query.page || "1"),
  };
  const result = await TodoService.find(queryParams, userId);
  res.json(result);
};

/**
 * POST
 */

type typePOST = { created: ITodo } | ResponseDataError;

const POST = async (req: NextApiRequest, res: NextApiResponse<typePOST>) => {
  const session = await auth(req, res);
  const userId = session?.user.id as string;
  validateBody<TypeTodoSchema>(req, res, todoSchema);
  const result = await TodoService.create(userId, req.body);
  res.json(result);
};

/**
 *
 */

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<typeGET | typePOST>
) => {
  if (req.method === "GET") {
    GET(req, res);
  } else if (req.method === "POST") {
    POST(req, res);
  }

  HttpError(res, 405);
};

export default tryCatchWrapper<typeof handler>(handler);
