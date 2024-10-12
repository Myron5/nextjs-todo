import { useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

import { TodoUpBar } from "../TodoUpBar/TodoUpBar";
import { TodoListLG } from "./TodoList.LG";
import { TodoListMD } from "./TodoList.MD";
import { TodoListSM } from "./TodoList.SM";
import { useTodos } from "@/lib/hooks/useTodos";
import { useMedia } from "@/lib/hooks/useMedia";
import {
  BAGES,
  SIZES,
  TODOS_LIMIT_PER_PAGE,
  TypeBages,
} from "@/lib/constants/default";
import { ErrorBox, MyButton } from "./TodoList.styled";
import { Spinner } from "../Other/Spinner";

export const TodoList = () => {
  const router = useRouter();
  const size = useMedia();
  const [keyword, setKeyword] = useState<string>("");
  const [bage, setBage] = useState<TypeBages>(BAGES[2]);
  const [page, setPage] = useState<number>(1);

  const { data, status } = useTodos(keyword, bage, page, TODOS_LIMIT_PER_PAGE);

  if (status === "pending") return <Spinner />;

  if (status === "error") {
    return <ErrorBox>Error, no data to display!</ErrorBox>;
  }

  /**
   * Render
   */

  return (
    <>
      <TodoUpBar {...{ bage, setKeyword, setBage }} />

      {data.todos.length === 0 && (
        <Typography>There is no todos to display!</Typography>
      )}

      {size === SIZES.LG && data.todos.length !== 0 && (
        <TodoListLG data={data} page={page} setPage={setPage} />
      )}

      {size === SIZES.MD && data.todos.length !== 0 && (
        <TodoListMD data={data} status={status} page={page} setPage={setPage} />
      )}

      {size === SIZES.SM && data.todos.length !== 0 && (
        <TodoListSM data={data} status={status} page={page} setPage={setPage} />
      )}

      <MyButton onClick={() => router.back()} backBtn>
        Back
      </MyButton>
    </>
  );
};
