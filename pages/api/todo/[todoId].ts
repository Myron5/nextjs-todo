import type { NextApiRequest, NextApiResponse } from "next";
import { DeleteResult, UpdateResult } from "typeorm";

import TodoService from "@/lib/services/backend/todo";
import { Todo, TodoEntityType } from "@/lib/entities/Todo";
import auth from "@/lib/utils/backend/auth";
import { validateBody } from "@/lib/utils/backend/validator";
import { doesntExist } from "@/lib/utils/backend/isExist";
import { TypeTodoSchema, todoSchema } from "@/lib/schemas/backend/todoSchema";

import { HttpError } from "@/lib/utils/backend/HttpError";
import { tryCatchWrapper } from "@/lib/utils/backend/tryCatch";
import ResponseDataError from "@/lib/types/responseDataError";
import typeGuard from "@/lib/utils/backend/reqQueryTypeguard";

/**
 * GET
 */

type typeGET = { todo: Todo } | ResponseDataError;

const GET = async (req: NextApiRequest, res: NextApiResponse<typeGET>) => {
  const todoId = typeGuard(req.query.todoId);
  const session = await auth(req, res);
  const userId = session?.user.id as string;
  doesntExist<TodoEntityType, string>(res, Todo, "id", todoId);
  const result = await TodoService.findById(userId, todoId);
  if (!result) {
    HttpError(res, result === null ? 404 : 403);
    return;
  }
  res.json(result);
};

/**
 * PUT
 */

type typePUT = { updated: UpdateResult } | ResponseDataError;

const PUT = async (req: NextApiRequest, res: NextApiResponse<typePUT>) => {
  const todoId = typeGuard(req.query.todoId);
  const session = await auth(req, res);
  const userId = session?.user.id as string;
  validateBody<TypeTodoSchema>(req, res, todoSchema);
  doesntExist<TodoEntityType, string>(res, Todo, "id", todoId);
  const result = await TodoService.update(userId, todoId, req.body);
  if (!result) {
    HttpError(res, 403);
    return;
  }
  res.json(result);
};

/**
 * DELETE
 */

type typeDELETE = { deleted: DeleteResult } | ResponseDataError;

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse<typeDELETE>
) => {
  const { todoId } = req.query;
  const session = await auth(req, res);
  const userId = session?.user.id as string;
  doesntExist<TodoEntityType, string>(res, Todo, "id", typeGuard(todoId));
  const result = await TodoService.delete(userId, typeGuard(todoId));
  if (!result) {
    HttpError(res, 403);
    return;
  }
  res.json(result);
};

/**
 *
 */

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<typeGET | typePUT | typeDELETE>
) => {
  if (req.method === "GET") {
    GET(req, res);
  } else if (req.method === "PUT") {
    PUT(req, res);
  } else if (req.method === "DELETE") {
    DELETE(req, res);
  }

  HttpError(res, 405);
};

export default tryCatchWrapper<typeof handler>(handler);
