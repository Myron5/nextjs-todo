import { API_KEYS } from "@/lib/constants/default";
import { instance } from "./instance";
import { IBackendTodoParams } from "@/lib/types/backendparams";
import { ITodo } from "@/lib/types/todo";

const getQueryString = (params: IBackendTodoParams) => {
  // Check if some Field have wrong type (if yes, filter this param)
  const paramsCopy = Object.entries(params).filter((entry) => entry[1]);

  return paramsCopy.length === 0
    ? ""
    : "?".concat(
        paramsCopy
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                String(value).toLowerCase()
              )}`
          )
          .join("&")
      );
};

export const getTodos = async (params: IBackendTodoParams) => {
  const { data } = await instance.get(API_KEYS.TODO_GETALL_POST + params);
  return data;
};

export const getTodoById = async (id: string) => {
  const { data } = await instance.get(
    API_KEYS.TODO_GETONE_PUT_DELETE.replace(":todoId", id)
  );
  return data;
};

export const createTodo = async (fullTodo: ITodo) => {
  const { name, description, isCompleted, isPrivate } = fullTodo;
  const newTodo = { name, description, isCompleted, isPrivate };
  const { data } = await instance.post(API_KEYS.TODO_GETALL_POST, newTodo);
  return data;
};

export const editTodo = async (fullTodo: ITodo & { id: string }) => {
  const { id, name, description, isCompleted, isPrivate } = fullTodo;
  const editedTodo = { name, description, isCompleted, isPrivate };
  const { data } = await instance.put(
    API_KEYS.TODO_GETONE_PUT_DELETE.replace(":todoId", id),
    editedTodo
  );
  return data;
};

export const deleteTodo = async (id: string) => {
  const { data } = await instance.delete(
    API_KEYS.TODO_GETONE_PUT_DELETE.replace(":todoId", id)
  );
  return data;
};
