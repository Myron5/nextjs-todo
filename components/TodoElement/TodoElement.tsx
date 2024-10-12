import { useRouter } from "next/router";
import { Switch, TableCell, TableRow } from "@mui/material";

import { useDeleteTodo, useEditTodo } from "@/lib/hooks/useTodos";
import { ROUTER_KEYS, SIZES, TypeSizes } from "@/lib/constants/default";
import { ITodo } from "@/lib/types/todo";
import {
  Name,
  Description,
  Actions,
  MyButton,
  ButtonGroup,
  Element,
  ElementExt,
} from "./TodoElement.styled";
import { SmallSpinner } from "../Other/Spinner";

interface ITodoElement extends ITodo {
  size: TypeSizes;
}

export const TodoElement: React.FC<ITodoElement> = (props) => {
  const { size, id, name, description, isCompleted, isPrivate } = props;

  const router = useRouter();
  const { mutate: mutateDelete, status: statusDelete } = useDeleteTodo();
  const { mutate: mutateEdit, status: statusEdit } = useEditTodo();
  const isLoading = statusDelete === "pending" || statusEdit === "pending";

  const onView = () => {
    if (!id) {
      return;
    }
    router.push(ROUTER_KEYS.TODO_DETAILS.replace(":todoId", id));
  };

  const onDelete = () => {
    if (!id) {
      return;
    }
    mutateDelete(id);
  };

  const onToggleCompleted = () => {
    const editedTodo = {
      id,
      name,
      description,
      isCompleted: !isCompleted,
      isPrivate,
    };
    mutateEdit(editedTodo);
  };

  if (size === SIZES.LG) {
    return (
      <TableRow
        sx={{
          width: "665px",
          heigh: "80px",
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        {isLoading ? (
          <TableCell
            sx={{ width: "665px", height: "80px" }}
            component="th"
            scope="row"
          >
            <SmallSpinner />
          </TableCell>
        ) : (
          <>
            <TableCell
              sx={{ maxWidth: "145px", overflow: "hidden" }}
              component="th"
              scope="row"
            >
              <Name isCompleted={isCompleted}>{name}</Name>
            </TableCell>
            <TableCell sx={{ width: "300px", overflow: "hidden" }}>
              <Description isCompleted={isCompleted}>{description}</Description>
            </TableCell>
            <TableCell>
              <Actions>
                <ButtonGroup>
                  <MyButton onClick={() => onView()}>View</MyButton>
                  <MyButton onClick={() => onDelete()}>Delete</MyButton>
                </ButtonGroup>
                <Switch onChange={onToggleCompleted} checked={isCompleted} />
              </Actions>
            </TableCell>
          </>
        )}
      </TableRow>
    );
  }

  if (size === SIZES.MD) {
    return (
      <ElementExt>
        {isLoading ? (
          <SmallSpinner />
        ) : (
          <>
            <Name isCompleted={isCompleted}>{name}</Name>
            <Description isCompleted={isCompleted}>{description}</Description>

            <Actions>
              <ButtonGroup>
                <MyButton onClick={() => onView()}>View</MyButton>
                <MyButton onClick={() => onDelete()}>Delete</MyButton>
              </ButtonGroup>
              <Switch onChange={onToggleCompleted} checked={isCompleted} />
            </Actions>
          </>
        )}
      </ElementExt>
    );
  }

  return (
    <Element>
      {isLoading ? (
        <SmallSpinner />
      ) : (
        <>
          <Name isCompleted={isCompleted}>{name}</Name>
          <Description isCompleted={isCompleted}>{description}</Description>

          <Actions>
            <ButtonGroup>
              <MyButton onClick={() => onView()}>View</MyButton>
              <MyButton onClick={() => onDelete()}>Delete</MyButton>
            </ButtonGroup>
            <Switch onChange={onToggleCompleted} checked={isCompleted} />
          </Actions>
        </>
      )}
    </Element>
  );
};
