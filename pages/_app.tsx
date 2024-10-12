import type { AppProps } from "next/app";
import Head from "next/head";

import Providers from "@/components/Providers/Providers";
import AppBar from "@/components/AppBar/AppBar";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Todo simplex</title>
        <meta
          name="description"
          content="Simple app, that allow you to create the list of things which you should do. Private or public notices. You can change status on done or delete each task."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Providers>
        <div className="container">
          <header>
            <AppBar />{" "}
          </header>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </Providers>
    </>
  );
}
