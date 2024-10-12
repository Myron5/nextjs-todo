import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodoById,
  getTodos,
} from "@/lib/services/frontend/todo";
import { QUERY_KEYS, TypeBages } from "@/lib/constants/default";
import notify from "@/lib/utils/frontend/notify";

const onError = (error: AxiosError<{ message: string }>) => {
  const { response, message } = error;
  notify.error(response?.data?.message || message);
};

export function useTodos(
  keyword: string,
  bage: TypeBages,
  page: number = 1,
  limit: number = 10
) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TODOS, bage, keyword, page, limit],
    queryFn: () => getTodos({ bage, search: keyword, page, limit }),
  });

  useEffect(() => {
    if (query.isError) {
      notify.error(query?.data?.message || query.error.message);
    }
  }, [query.isError]);

  return query;
}

export function useOneTodo(id: string) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TODO, id],
    queryFn: () => getTodoById(id),
  });

  useEffect(() => {
    if (query.isError) {
      notify.error(query?.data?.message || query.error.message);
    }
  }, [query.isError]);

  return query;
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] })
        .then(() => notify.success("Created successfully!"));
    },
    onError,
  });

  return mutation;
}

export function useEditTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.TODO] })

        .then(() => notify.success("Edited  successfully!"));
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] })
        .then(() => notify.success("Edited  successfully!"));
    },
    onError,
  });
  return mutation;
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] })
        .then(() => notify.success("Deleted successfully!"));
    },
    onError,
  });

  return mutation;
}
