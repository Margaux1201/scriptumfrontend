import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import favorite from "../reducers/favorite";

const store = configureStore({
  reducer: { user, favorite },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
