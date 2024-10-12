import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";

import {
  confirmEmail,
  register,
  resetPassword,
  sendResetPassword,
} from "@/lib/services/frontend/user";
import notify from "@/lib/utils/frontend/notify";
import { QUERY_KEYS } from "@/lib/constants/default";

const onError = (error: AxiosError<{ message: string }>) => {
  const { response, message } = error;
  notify.error(response?.data?.message || message);
};

export function useRegister() {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      notify.success("Registrated successfully, check our email to verify!");
    },
    onError,
  });
  return mutation;
}
// !!! Custom hook
export function useLogin() {
  const [status, setStatus] = useState<"pending" | "success" | "error" | null>(
    null
  );

  const mutate = async (...args: any[]) => {
    setStatus("pending");
    const signInResponse = await signIn(...args);

    if (!signInResponse || signInResponse.ok !== true) {
      setStatus("error");
      notify.error("Invalid email or password");
    } else {
      setStatus("success");
    }
  };

  return { mutate, status };
}

export function useSendResetPassword() {
  const mutation = useMutation({
    mutationFn: sendResetPassword,
    onSuccess: () => {
      notify.success("Check your email!");
    },
    onError,
  });
  return mutation;
}

export function useResetPassword() {
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      notify.success("New password setted successfully!");
    },
    onError,
  });
  return mutation;
}

export function useVerify(verifToken: string) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER, verifToken],
    queryFn: () => confirmEmail(verifToken),
  });

  useEffect(() => {
    if (query.isSuccess) {
      notify.success("Confirmed successfully!");
    }

    if (query.isError) {
      notify.error(query?.data?.message || query.error.message);
    }
  }, [query.isError, query.isSuccess]);

  return query;
}
