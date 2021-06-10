import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ParallaxMouse from "../components/ParallaxMouse";
import Console from "../components/Console";

export default function Home() {
  // Initialize Spring for mouse parallax
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 600, friction: 100 },
  }));

  // Used to set the new position of the cursor in order for Spring to react to
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];

  return (
    <>
      {/* <div className={styles.container}> */}
      <Head>
        <title>ctrl.</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Sam during their time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>
      <main className={styles.main__container} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <Console />
        <Parallax className={styles.main__container_introparallax} blur={10} strength={600}>
          <ParallaxMouse xFactor={230} springProps={springProps}>
            <section className={styles.main__container_intro}>
              <h1 className={`${styles.title} ${styles.container__intro_title}`}>
                Thought you were safe <br /> surfing <span className={styles.highlight}>the web?</span>
              </h1>
              <p className={styles.container__intro_text}>
                Well you aren't. You're far from safe. Every move you make online is constantly being watched, tracked,
                saved in a profile and used against you to not only show you targeted ads, but in the long term
                influence the way you think.
              </p>
              <section className={styles.container__intro_buttons}>
                <button className={styles.intro__buttons_primary}>Experience how they do it</button>
                <p className={styles.intro__buttons_or}>or</p>
                <button className={styles.intro__buttons_secondary}>Learn to protect yourself</button>
              </section>
            </section>
          </ParallaxMouse>
          {/*<div // Is necessary for mouseMove event to fire for mouse parallax
            className={styles.parallaxContainer}
          >*/}
          {/* This component MUST be in a container for the mouseMove event
              to fire. The Parallax scroll bg does not register it */}

          <ParallaxMouse xFactor={10} className={styles.parallax__img_surfer} springProps={springProps}>
            <Image src="/surfer.png" alt="businessman on surfboard with briefcase" width={550} height={550} />
          </ParallaxMouse>

          <ParallaxMouse xFactor={50} className={styles.parallax__img_bgWave} springProps={springProps}>
            <Image src="/datawave.png" alt="smaller wave in the background" width={1000} height={400} />
          </ParallaxMouse>

          <ParallaxMouse xFactor={30} className={styles.parallax__img_mainWave} springProps={springProps}>
            <div className={styles.parallax__img_fullwidth}>
              {/* Wrapped this image in a div in order to extend outside the viewport width and still have parallax without ugly borders*/}
              <Image
                className={styles.parallax__img}
                style={{
                  overflow: "visible",
                  minWidth: "150%",
                  left: "-25%",
                }}
                src="/mainwave.png"
                alt="Wave in the background where the surfer is surfing on"
                width={3000}
                height={800}
              />
            </div>
          </ParallaxMouse>
          {/*</Parallax></div>*/}
          <ThreejsObjects className={styles.threejs__object} />
          <section className={styles.main__container_become}>
            <section className={styles.container__become_text}>
              <h1 className={`${styles.become__text_title} ${styles.title}`}>
                Become the eyes behind <span className={styles.highlight}>everything</span>
              </h1>
              <p className={styles.become__text_body}>
                We've created an experience were we take you through the dark algoritm of the internet. We'll show you
                what happens when you blindly accept cookies and you will decide Tom's fate.
              </p>
              <button className={styles.become__text_button}>Become big brother</button>
            </section>
            <ParallaxMouse
              xFactor={Infinity}
              yFactor={10}
              className={styles.container__become_img}
              springProps={springProps}
            >
              <Image src="/pcmeneer.gif" alt="smaller wave in the background" width={900} height={650} />
            </ParallaxMouse>
          </section>
          <section className={styles.main__container_whatcanido}>
            <ParallaxMouse xFactor={10} className={styles.container__whatcanido_img} springProps={springProps}>
              <Image
                src="/paraplu-dame.png"
                alt="smaller wave in the background"
                width={598 * (3 / 4)}
                height={1021 * (3 / 4)}
              />
            </ParallaxMouse>
            <section className={styles.container__whatcanido_text}>
              <h1 className={`${styles.whatcanido__text_title} ${styles.title}`}>What can I do?</h1>
              <p className={styles.whatcanido__text_body}>
                Now you might be wondering what you can do to prevent such activities. Don't worry we've listed
                everything you can do and we created a tool to scan yourself in which you can see everything companies
                can track about you when you accept cookies.
              </p>
              <section className={styles.button__container}>
                <button className={styles.button}>
                  ctrl. your <span className={styles.highlight2}>identity</span>
                </button>
                <button className={`${styles.button} ${styles.light}`}>Experience how they do it</button>
              </section>
            </section>
          </section>
        </Parallax>
        {/*<ThreejsObjects />*/}
      </main>
      <footer className={styles.footer}>
        <h1 className={styles.footer__title}>Integration 4</h1>
        <p className={styles.footer__body}>an experience brought to life by</p>
        <ul className={styles.footer__names}>
          <li className={styles.footer__names_name}>Noa Lambert</li>
          <li>
            <Image src="/footerlistdot.svg" alt="orange delimiter dot" width={15} height={15} />
          </li>
          <li className={styles.footer__names_name}>Kenzo Dewaegenaere</li>
          <li>
            <Image src="/footerlistdot.svg" alt="orange delimiter dot" width={15} height={15} />
          </li>
          <li className={styles.footer__names_name}>Samuel Vanhaecke</li>
        </ul>
        {/* <img className={styles.footer__bg} src="/footer_bg.svg"></img> */}
        <div className={styles.footer__bg}>
          {/* <Image src="/footer_bg.svg" alt="footer triangle" width={1920} height={913} /> */}
        </div>
      </footer>
      {/* </div> */}
    </>
  );
}
