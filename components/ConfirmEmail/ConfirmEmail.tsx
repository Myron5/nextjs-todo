import { useEffect } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Typography, Link } from "@mui/material";

import { useVerify } from "@/lib/hooks/useUser";
import { ROUTER_KEYS } from "@/lib/constants/default";
import { Spinner } from "../Other/Spinner";

const ConfirmEmailContainer = () => {
  const { confirmToken = "" } = useParams<{ confirmToken: string }>();
  const router = useRouter();
  const { status } = useVerify(confirmToken);

  if (status === "pending") {
    return <Spinner />;
  }

  if (status === "error") {
    return <Typography>Error, token not confirmed!</Typography>;
  }

  return (
    <div>
      <Typography>Email confirmed!</Typography>

      <Link onClick={() => router.replace(ROUTER_KEYS.ROOT)} underline="hover">
        Get Started
      </Link>
    </div>
  );
};

export default ConfirmEmailContainer;
