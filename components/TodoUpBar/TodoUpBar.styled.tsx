import { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from "react";
import { TextField, ToggleButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

import { media } from "@/lib/utils/frontend/media";

export const BarBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  ${media(
    "sm",
    "flex-direction: column-reverse; align-items: flex-start; margin-left: 0;"
  )}
  ${media(
    "md",
    "flex-direction: column-reverse; align-items: flex-start; margin-left: 15px;"
  )}
  ${media("lg", "flex-direction: row; align-items: center; margin-left: 0;")}
`;

// -------------------- MySearchButton --------------------

interface IMySearchButton {
  onClick: () => void;
}

export const BtnStyled = styled.button`
  position: absolute;
  top: 50%;
  left: calc(100% - 10px);
  transform: translate(-100%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const MySearchButton: React.FC<IMySearchButton> = ({ onClick }) => (
  <BtnStyled type="submit" onClick={onClick}>
    <SearchIcon />
  </BtnStyled>
);

// -------------------- MyRadioButton --------------------
interface IMyToggleButton {
  children: ReactNode | ReactNode[];
  key: number;
  value: string;
  ariaLabel?: string | undefined;
  disabled: boolean;
}

const ComponentRadioButton: FC<IMyToggleButton> = (props) => (
  <ToggleButton {...props} size="small" />
);

export const MyRadioButton = styled(ComponentRadioButton)`
  max-height: 40px;
`;

// -------------------- BasicForm ------------------------

export const BasicForm = styled.form`
  width: 100%;
`;

// -------------------- MyTextField ----------------------
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
  onClick: () => void;
}

export const RelativeDiv = styled.div`
  position: relative;
`;

const ComponentTextField: FC<Omit<IMyTextField, "onClick">> = (props) => (
  <TextField size="small" {...props} fullWidth />
);

export const StyledTextField = styled(ComponentTextField)`
  ${media("sm", "width: 100%;")}
  ${media("md", "width: 100%;")}
  ${media("lg", "width: 160px;")}
`;

export const MyTextField: FC<IMyTextField> = ({ onClick, ...otherProps }) => (
  <RelativeDiv>
    <StyledTextField {...otherProps} />
    <MySearchButton onClick={onClick} />
  </RelativeDiv>
);

// -------------------------------------------------------
