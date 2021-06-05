import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring, animated } from "react-spring"; // Mouse parallax
import { useEffect, useState } from "react";

// import landing from "/landing.png";

export default function Home() {
  const [orientation, setOrientation] = useState();

  useEffect(() => {
    const updateOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation(false);
        console.log("portrait");
      } else {
        setOrientation(true);
        console.log("landscape");
      }
    };
    updateOrientation();

    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="desc" />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>

      <main className={styles.main__container}>
        <h1 className={styles.title}>Screen orientation Demo!</h1>
        <p className={styles.orientation}>
          Orientation: {orientation ? "Landscape" : "Portrait"}
        </p>
      </main>
    </div>
  );
}
