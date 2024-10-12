import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";

export const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px';
`;

export const MyButtonGroup = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
`;

// -------------------- MyButton --------------------
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
