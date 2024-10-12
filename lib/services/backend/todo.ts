import { DeepPartial } from "typeorm";

import { Todo } from "@/lib/entities/Todo";
import { User } from "@/lib/entities/User";
import { ITodo } from "@/lib/types/todo";
import { getRequestForDB } from "@/lib/utils/backend/getRequestForDB";
import { IBackendTodoParams } from "@/lib/types/backendparams";
import { TODOS_LIMIT_PER_PAGE } from "@/lib/constants/default";

class TodoService {
  async find(queryParams: IBackendTodoParams, userId: string) {
    queryParams.limit = queryParams.limit || TODOS_LIMIT_PER_PAGE;
    queryParams.page = queryParams.page || 1;
    const [todos, total] = await Todo.findAndCount(
      getRequestForDB(queryParams, userId)
    );
    const totalPages = Math.ceil(total / queryParams.limit);
    return { todos, total, totalPages, currentPage: Number(queryParams.page) };
  }

  async findById(userId: string, todoId: string) {
    const todo = await Todo.findOne({ where: { id: todoId } });
    if (!todo || !(!todo.isPrivate || userId === todo.creator)) {
      return;
    }
    return { todo };
  }

  async create(id: string, todo: ITodo) {
    const created = await Todo.save({
      ...todo,
      creator: id,
    } as DeepPartial<Todo>);
    return { created };
  }

  async delete(userid: string, todoId: string) {
    if (!this.findById(userid, todoId)) {
      return null;
    }
    const deleted = await Todo.delete(todoId);
    return { deleted };
  }

  async update(userId: string, todoId: string, newTodo: ITodo) {
    if (!this.findById(userId, todoId)) {
      return null;
    }
    const updated = await Todo.update(todoId, newTodo);
    return { updated };
  }
}

const todoService = new TodoService();
export default todoService;
