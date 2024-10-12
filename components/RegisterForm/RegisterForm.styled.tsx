import { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from "react";
import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";

export const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px';
`;

interface IMyTextField {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  fullWidth?: boolean | undefined;
}

const MyTextFieldComponent: FC<IMyTextField> = (props) => (
  <TextField
    {...props}
    onPaste={(e) => e.preventDefault()}
    onCopy={(e) => e.preventDefault()}
  />
);

export const MyTextField = styled(MyTextFieldComponent)`
  user-select: none;
`;

// -------------------- MyButton --------------------

export const MyButtonGroup = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
`;

interface IMyButton {
  children?: ReactNode | ReactNode[];
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export const BtnStyled = styled(Button)<IMyButton>`
  width: 70px;
`;

export const MyButton: React.FC<IMyButton> = ({ children, ...otherProps }) => (
  <BtnStyled {...otherProps} size="small" variant="outlined">
    {children}
  </BtnStyled>
);
// -----------------------------------------------
