import "../styles/globals.scss";
import { useEffect } from "react";

function Ctrl({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default Ctrl;
