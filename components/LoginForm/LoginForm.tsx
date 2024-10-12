import { useRouter } from "next/router";
import { useFormik } from "formik";
import { Link, TextField, Typography } from "@mui/material";

import { useLogin } from "@/lib/hooks/useUser";
import { schemaLogin as validationSchema } from "@/lib/schemas/frontend/user.schemas";
import { LoginFormInitials } from "@/lib/constants/formik";
import { ROUTER_KEYS } from "@/lib/constants/default";
import { BasicForm, MyButton, MyButtonGroup } from "./LoginForm.styled";
import { Spinner } from "../Other/Spinner";

export const LoginForm = () => {
  const router = useRouter();
  const { mutate: mutateLogin, status: statusLogin } = useLogin();

  const handleOnSubmit: LoginFormInitials.IHandleOnSubmit = async (
    values,
    actions
  ) => {
    mutateLogin("Credentials", { ...values, redirect: false });
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: LoginFormInitials.initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  if (statusLogin === "pending") {
    return <Spinner />;
  }

  if (statusLogin === "success") {
    return (
      <>
        <Typography>Login successfully!</Typography>
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
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <MyButtonGroup>
        <MyButton onClick={() => router.back()}>Back</MyButton>
        <MyButton type="submit">Submit</MyButton>
      </MyButtonGroup>
    </BasicForm>
  );
};
