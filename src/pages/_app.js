import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
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
