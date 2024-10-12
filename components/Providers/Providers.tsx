"use client";

import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "react-toastify/dist/ReactToastify.css";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        {children}
        <ToastContainer />
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
