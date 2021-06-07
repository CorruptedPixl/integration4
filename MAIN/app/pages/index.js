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
        <section className={styles.main__container_intro}>
          <h1 className={(styles.container__intro_title, styles.title)}>
            Thought you were safe surfing <span className={styles.highlight}>the web?</span>
          </h1>
          <p className={styles.container__intro_text}>
            Well you aren't. You're far from safe. Every move you make online is constantly being watched, tracked,
            saved in a profile and used against you to not only show you targeted ads, but in the long term influence
            the way you think.
          </p>
          <section className={styles.container__intro_buttons}>
            <button className={styles.intro__buttons_button}>Experience how they do it</button>
            <p className={styles.intro__buttons_or}>or</p>
            <button className={styles.intro__buttons_button}>Learn to protect yourself</button>
          </section>
        </section>
        <Parallax blur={10} bgImage="/laptop.png" bgImageAlt="laptop dude" strength={600}>
          <div // Is necessary for mouseMove event to fire for mouse parallax
            className={styles.parallaxContainer}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
          >
            {/* This component MUST be in a container for the mouseMove event
              to fire. The Parallax scroll bg does not register it */}

            <ParallaxMouse
              xFactor={5}
              className={styles.parallax__img_surfer}
              globalFactor={globalFactor}
              springProps={springProps}
            >
              <Image src="/surfer.png" alt="businessman on surfboard with suitcase" width={520} height={496} />
            </ParallaxMouse>

            <ParallaxMouse
              xFactor={50}
              className={styles.parallax__img_bgWave}
              globalFactor={globalFactor}
              springProps={springProps}
            >
              <Image src="/Smallwave.png" alt="smaller wave in the background" width={800} height={600} />
            </ParallaxMouse>

            <ParallaxMouse
              xFactor={50}
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
          </div>
        </Parallax>
        <section className={styles.main__container_become}>
          <section className={styles.container__become_text}>
            <h1 className={(styles.become__text_title, styles.title)}>
              Become the eyes behind <span className={styles.highlight}>everything</span>
            </h1>
            <p className={styles.become__text_body}>
              We've created an experience were we take you through the dark algoritm of the internet. We'll show you
              what happens when you blindly accept cookies and you will decide Tom's fate.
            </p>
            <button className={styles.become__text_button}>Become big brother</button>
          </section>
          <img className={styles.container__become_img}></img>
        </section>
        <section className={styles.main__container_whatcanido}>
          <img className={styles.container__whatcanido_img}></img>
          <section className={styles.container__whatcanido_text}>
            <h1 className={(styles.whatcanido__text_title, styles.title)}>What can I do?</h1>
            <p className={styles.whatcanido__text_body}>
              Now you might be wondering what you can do to prevent such activities. Don't worry we've listed everything
              you can do and we created a tool to scan yourself in which you can see everything companies can track
              about you when you accept cookies.
            </p>
            <button className={styles.whatcanido__text_button}>Become big brother</button>
          </section>
        </section>
      </main>
    </div>
  );
}
