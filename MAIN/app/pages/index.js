import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";

import ParallaxMouse from "../components/ParallaxMouse";

export default function Home() {
  // Initialize Spring for mouse parallax
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 600, friction: 100 },
  }));

  // Used to set the new position of the cursor in order for Spring to react to
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];

  // Set global factor that mouse parallax should be lowered by
  const [globalFactor, setGlobalFactor] = useState(8);

  return (
    <div className={styles.container}>
      <Head>
        <title>ctrl.</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Tom during his time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>

      <main className={styles.main__container}>
        <h1 className={styles.title}>Welcome to ctrl!</h1>

        <Parallax blur={10} bgImage="/laptop.png" bgImageAlt="laptop dude" strength={600}>
          <div // Is necessary for mouseMove event to fire for mouse parallax
            className={styles.parallaxContainer}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
          >
            {/* This component MUST be in a container for the mouseMove event
              to fire. The Parallax scroll bg does not register it */}

            <ParallaxMouse
              xFactor={6}
              className={styles.parallax__img_surfer}
              globalFactor={globalFactor}
              springProps={springProps}
            >
              <Image src="/surfer.png" alt="businessman on surfboard with suitcase" width={640} height={496} />
            </ParallaxMouse>

            <ParallaxMouse
              xFactor={10}
              className={styles.parallax__img_bgWave}
              globalFactor={globalFactor}
              springProps={springProps}
            >
              <Image src="/Smallwave.png" alt="smaller wave in the background" width={800} height={600} />
            </ParallaxMouse>

            <ParallaxMouse
              xFactor={8}
              className={styles.parallax__img_mainWave}
              globalFactor={globalFactor}
              springProps={springProps}
            >
              <div className={styles.parallax__img_fullwidth}>
                {/* Wrapped this image in a div in order to extend outside the viewport width and still have parallax without ugly borders*/}
                <Image
                  className={styles.parallax__img}
                  style={{
                    overflow: "visible",
                    minWidth: "150%",
                    left: "-25%",
                  }}
                  src="/Bigwave.png"
                  alt="Wave in the background where the surfer is surfing on"
                  width={3000}
                  height={800}
                />
              </div>
            </ParallaxMouse>
            <ParallaxMouse xFactor={4} globalFactor={globalFactor} springProps={springProps}>
              <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
            </ParallaxMouse>

            <ParallaxMouse xFactor={10} globalFactor={globalFactor} springProps={springProps}>
              <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
            </ParallaxMouse>
            <ParallaxMouse xFactor={8} globalFactor={globalFactor} springProps={springProps}>
              <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
            </ParallaxMouse>
            <ParallaxMouse xFactor={6} globalFactor={globalFactor} springProps={springProps}>
              <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
            </ParallaxMouse>
            <ParallaxMouse xFactor={3.5} globalFactor={globalFactor} springProps={springProps}>
              <Image src="/laptop.png" alt="laptop dude" width={640} height={496} />
            </ParallaxMouse>
          </div>
        </Parallax>

        <p className={styles.description}>
          Lopem ipsum or something I don't know the actual text but there's probably a dolor summet or something in it.
        </p>
      </main>
    </div>
  );
}
