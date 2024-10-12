import { Pagination } from "@mui/material";

import { TodoElement } from "../TodoElement/TodoElement";
import { SIZES } from "@/lib/constants/default";
import { ITodo } from "@/lib/types/todo";
import { BasicTable, WrapBox } from "./TodoList.styled";

interface ITodoListLGProps {
  data: {
    todos: ITodo[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoListLG: React.FC<ITodoListLGProps> = ({
  data,
  page,
  setPage,
}) => {
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (data.total === 0) {
    return <p>There is no todos to display!</p>;
  }

  return (
    <WrapBox>
      <BasicTable>
        {data.todos.map((todo: ITodo) => (
          <TodoElement key={todo.id} {...{ ...todo, size: SIZES.LG }} />
        ))}
      </BasicTable>

      <Pagination
        count={data.totalPages}
        page={page}
        onChange={handlePaginationChange}
      />
    </WrapBox>
  );
};
