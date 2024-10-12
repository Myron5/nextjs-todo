import { FindManyOptions, ILike } from "typeorm";

import { BAGES, TODOS_LIMIT_PER_PAGE } from "@/lib/constants/default";
import { Todo } from "@/lib/entities/Todo";
import { IBackendTodoParams } from "@/lib/types/backendparams";

interface IGetRequestForDB {
  (params: IBackendTodoParams, creator: string): FindManyOptions<Todo>;
}

export const getRequestForDB: IGetRequestForDB = (queryParams, creator) => {
  const { bage, search, limit = TODOS_LIMIT_PER_PAGE, page = 1 } = queryParams;

  if (!search) {
    switch (bage) {
      case BAGES[0]: // all
        return {
          where: [{ isPrivate: false }, { creator }],
          order: { id: "DESC" },
          skip: (page - 1) * limit,
          take: limit,
        };
      case BAGES[1]: // private
        return {
          where: { creator, isPrivate: true },
          order: { id: "DESC" },
          skip: (page - 1) * limit,
          take: limit,
        };
      case BAGES[2]: // public
        return {
          where: { isPrivate: false },
          order: { id: "DESC" },
          skip: (page - 1) * limit,
          take: limit,
        };
      case BAGES[3]: // completed
        return {
          where: [
            { isPrivate: false, isCompleted: true },
            { creator, isCompleted: true },
          ],
          order: { id: "DESC" },
          skip: (page - 1) * limit,
          take: limit,
        };
    }
  }

  switch (bage) {
    case BAGES[0]: // all
      return {
        where: [
          { isPrivate: false, name: ILike(`%${search}%`) },
          { creator, name: ILike(`%${search}%`) },
        ],
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      };
    case BAGES[1]: // private
      return {
        where: { creator, isPrivate: true, name: ILike(`%${search}%`) },
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      };
    case BAGES[2]: // public
      return {
        where: { isPrivate: false, name: ILike(`%${search}%`) },
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      };
    case BAGES[3]: // completed
      return {
        where: [
          { isPrivate: false, isCompleted: true, name: ILike(`%${search}%`) },
          {
            creator,
            isCompleted: true,
            name: ILike(`%${search}%`),
          },
        ],
        order: { id: "DESC" },
        skip: (page - 1) * limit,
        take: limit,
      };
  }
};
