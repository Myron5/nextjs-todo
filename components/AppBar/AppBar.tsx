import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ROUTER_KEYS } from "@/lib/constants/default";
import { BarBox, Flex, Name, MyButton, HomeButton } from "./AppBar.styled";

const AppBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <BarBox>
      {session?.user && (
        <Flex>
          <MyButton onClick={() => router.push(ROUTER_KEYS.CREATE_TODO)}>
            Create
          </MyButton>
          <Name>{session?.user?.email}</Name>
        </Flex>
      )}
      <HomeButton onClick={() => router.push(ROUTER_KEYS.ROOT)} />
    </BarBox>
  );
};

export default AppBar;
