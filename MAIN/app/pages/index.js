import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import ParallaxJS from "parallax-js";
import { Parallax } from "react-parallax";

// import landing from "/landing.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="desc" />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {/* <Image src="/laptop.png" alt="laptop dude" width={640} height={496} /> */}

        <Parallax
          blur={10}
          bgImage="../laptop.png"
          bgImageAlt="the cat"
          strength={200}
        >
          Content goes here. Parallax height grows with content height.
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
          <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
        </Parallax>

        <p className={styles.description}>
          Lopem ipsum or something I don't know the actual text but there's
          probably a dolor summet or something in it.
        </p>
      </main>
    </div>
  );
}
