import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        closeOnClick
        hideProgressBar
        autoClose={1500}
        position="top-right"
        theme="colored"
      />
    </>
  );
}
