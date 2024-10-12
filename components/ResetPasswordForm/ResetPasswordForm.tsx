import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { Link, TextField, Typography } from "@mui/material";

import { ResetPasswordFormInitials } from "@/lib/constants/formik";
import { ROUTER_KEYS } from "@/lib/constants/default";
import { useResetPassword } from "@/lib/hooks/useUser";
import { schemaResetPassword as validationSchema } from "@/lib/schemas/frontend/user.schemas";
import { Spinner } from "../Other/Spinner";
import { BasicForm, MyButton, MyButtonGroup } from "./ResetPasswordForm.styled";

export const ResetPasswordForm = () => {
  // const { resetPassToken = "" } = useParams();
  const router = useRouter();
  const { resetPassToken = "" } = useParams<{ resetPassToken: string }>();
  const { mutate: mutateReset, status: statusReset } = useResetPassword();

  const handleOnSubmit: ResetPasswordFormInitials.IHandleOnSubmit = (
    values,
    actions
  ) => {
    if (!resetPassToken) {
      return;
    }
    if (values.newpassword !== values.confirmnewpassword) {
      actions.setErrors({
        confirmnewpassword: "Password password doesn't match",
      });
      return;
    }
    mutateReset({ newpassword: values.newpassword, resetPassToken });
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: ResetPasswordFormInitials.initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  if (statusReset === "pending") {
    return <Spinner />;
  }

  if (statusReset === "success") {
    return (
      <>
        <Typography>Resetted successfully!</Typography>
        <Link
          onClick={() => router.replace(ROUTER_KEYS.ROOT)}
          underline="hover"
        >
          Get Started
        </Link>
      </>
    );
  }

  return (
    <BasicForm onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="newpassword"
        name="newpassword"
        label="New Password"
        type="password"
        value={formik.values.newpassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
        helperText={formik.touched.newpassword && formik.errors.newpassword}
      />
      <TextField
        fullWidth
        id="confirmnewpassword"
        name="confirmnewpassword"
        label="Confirm New Password"
        type="password"
        value={formik.values.confirmnewpassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmnewpassword &&
          Boolean(formik.errors.confirmnewpassword)
        }
        helperText={
          formik.touched.confirmnewpassword && formik.errors.confirmnewpassword
        }
      />

      <MyButtonGroup>
        <MyButton onClick={() => router.back()}>Back</MyButton>
        <MyButton type="submit">Submit</MyButton>
      </MyButtonGroup>
    </BasicForm>
  );
};
