import { useRouter } from "next/router";
import { useFormik } from "formik";
import { TextField, Typography } from "@mui/material";

import { useSendResetPassword } from "@/lib/hooks/useUser";
import { schemaSendResetPassword as validationSchema } from "@/lib/schemas/frontend/user.schemas";
import { SendResetPasswordFormInitials } from "@/lib/constants/formik";
import { Spinner } from "../Other/Spinner";
import { BasicForm, MyButton, MyButtonGroup } from "./ResetPasswordForm.styled";

export const SendResetPasswordForm = () => {
  const router = useRouter();
  const { mutate: mutateSend, status: statusSend } = useSendResetPassword();

  const handleOnSubmit: SendResetPasswordFormInitials.IHandleOnSubmit = (
    values,
    actions
  ) => {
    mutateSend(values);
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: SendResetPasswordFormInitials.initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  if (statusSend === "pending") {
    return <Spinner />;
  }

  if (statusSend === "success") {
    return <Typography>Check your email</Typography>;
  }

  return (
    <BasicForm onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <MyButtonGroup>
        <MyButton onClick={() => router.back()}>Back</MyButton>
        <MyButton type="submit">Submit</MyButton>
      </MyButtonGroup>
    </BasicForm>
  );
};
