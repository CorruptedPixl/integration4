import "../styles/globals.scss";
import { useEffect } from "react";

function Ctrl({ Component, pageProps }) {
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.target.body.classList.contains("on-scrollbar") === false) {
        e.target.body.classList.add("on-scrollbar");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return <Component {...pageProps} />;
}

export default Ctrl;
