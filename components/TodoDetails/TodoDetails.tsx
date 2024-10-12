import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { useToggle } from "@/lib/hooks/useToggle";
import { useOneTodo } from "@/lib/hooks/useTodos";
import { EditTodoForm } from "../EditTodoForm/EditTodoForm";
import { Spinner } from "../Other/Spinner";
import {
  Description,
  ErrorBox,
  Title,
  MyButton,
  FlexBox,
} from "./TodoDetails.styled";

export const TodoDetails = () => {
  const router = useRouter();
  const { todoId = "" } = useParams<{ todoId: string }>();
  const { data: session } = useSession();

  const [isEditing, toggleEdit] = useToggle();
  const { data, status } = useOneTodo(todoId!);

  if (status === "pending") return <Spinner />;

  if (status === "error") {
    return <ErrorBox>Error, no data to display !</ErrorBox>;
  }

  return (
    <div>
      <Title>
        {data.todo.name}
        <FlexBox>
          <MyButton onClick={() => toggleEdit()}>Edit</MyButton>
        </FlexBox>
      </Title>
      <Description>{data.todo.description}</Description>
      <MyButton onClick={() => router.back()} isGoBack>
        Back
      </MyButton>

      {isEditing && session?.user?.id === data.todo.creator && (
        <EditTodoForm {...{ isEditing, data: data.todo, status, toggleEdit }} />
      )}
    </div>
  );
};
