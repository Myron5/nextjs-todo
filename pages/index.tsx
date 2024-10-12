import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Button, Link, Stack } from "@mui/material";

import { ROUTER_KEYS } from "@/lib/constants/default";

const HomePageContainer = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Box sx={{ textAlign: "center", mt: "30px", mb: "40px" }}>
      <h1>My Todo App</h1>

      <Stack spacing={3} sx={{ marginTop: "50px" }}>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {session?.user ? (
            <>
              {/* To App */}
              <Button
                sx={{ width: "200px" }}
                variant="outlined"
                onClick={() => router.push(ROUTER_KEYS.TODO)}
              >
                To App
              </Button>

              {/* Logout */}
              <Button
                sx={{ width: "200px" }}
                variant="outlined"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login */}
              <Button
                sx={{ width: "200px" }}
                variant="outlined"
                onClick={() => router.push(ROUTER_KEYS.SIGNIN)}
              >
                Login
              </Button>

              {/* Register */}
              <Button
                sx={{ width: "200px" }}
                variant="outlined"
                onClick={() => router.push(ROUTER_KEYS.SIGNUP)}
              >
                Register
              </Button>
            </>
          )}
        </Stack>

        <Link
          onClick={() => router.push(ROUTER_KEYS.RESET_PASSWORD)}
          underline="hover"
        >
          Forgot Password ?
        </Link>
      </Stack>
    </Box>
  );
};

export default HomePageContainer;
