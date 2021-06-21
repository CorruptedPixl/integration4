import styles from "../styles/Home.module.scss";
import buttons from "../styles/Buttons.module.scss";
import Head from "next/head";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ThreejsObjectsMainlow from "../components/ThreejsObjectsMainlow.js";
import ParallaxMouse from "../components/ParallaxMouse";
import Console from "../components/Console";
import Toggle from "../components/Toggle";
import translations from "../translations/index.json";

export default function Home() {
  // Initialize Spring for mouse parallax
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 600, friction: 100 },
  }));

  // Used to set the new position of the cursor in order for Spring to react to
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];

  const [socket, setSocket] = useState();
  const [toggleLangState, setToggleLangState] = useState("en");

  return (
    <>
      {/* <div className={styles.container}> */}
      <Head>
        <title>ctrl. | Home</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Sam during their time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>
      <main className={styles.main__container} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <Console socket={socket} setSocket={setSocket} />
        <Parallax className={styles.main__container_introparallax} blur={10} strength={600}>
          <Toggle
            className={styles.toggleSwitch}
            toggleState={toggleLangState}
            setToggleState={setToggleLangState}
            valueLeft={"nl"}
            valueRight={"en"}
          />
          <ParallaxMouse xFactor={230} springProps={springProps}>
            <section className={styles.main__container_intro}>
              <h2 className={`${styles.title} ${styles.container__intro_title}`}>
                {translations.title.safe[toggleLangState]}
                <br />
                {translations.title.surfing[toggleLangState]}
                <span className={styles.highlight}> {translations.title.web[toggleLangState]}</span>
              </h2>
              <p className={styles.container__intro_text}>{translations.intro[toggleLangState]}</p>
              <ParallaxMouse xFactor={50} springProps={springProps}>
                <section className={styles.container__intro_buttons}>
                  <a
                    href="/experience"
                    onClick={() => socket.emit("consoleMessage", "A user opened the console")}
                    className={buttons.button}
                  >
                    {translations.buttons.experience[toggleLangState]}
                  </a>
                  <p className={styles.intro__buttons_or}>{translations.buttons.or[toggleLangState]}</p>
                  <a href="/secureyourself" className={`${buttons.button} ${buttons.dark}`}>
                    {translations.buttons.protect[toggleLangState]}
                  </a>
                </section>
              </ParallaxMouse>
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
          <div className={styles.threejs__cookie__object__pos}>
            <ThreejsObjects className={styles.threejs__object} />
          </div>
          <section className={styles.main__container_become}>
            <section className={styles.container__become_text}>
              <h2 className={`${styles.become__text_title} ${styles.title}`}>
                {translations.become.title.main[toggleLangState]}
                <br className={styles.text__title_br} />
                <span className={styles.highlight}> {translations.become.title.highlight[toggleLangState]}</span>
              </h2>
              <p className={styles.become__text_body}>{translations.become.body[toggleLangState]}</p>
              <h3 className={styles.become__text_h3}>
                {translations.become.subtitle.go[toggleLangState]} <span className={styles.highlight}>' / '</span>
                {translations.become.subtitle.findOut[toggleLangState]}{" "}
                <span className={styles.highlight}>{translations.become.subtitle.onlyOne[toggleLangState]} </span>
                {translations.become.subtitle.here[toggleLangState]}
              </h3>
            </section>
            <ParallaxMouse
              xFactor={Infinity}
              yFactor={10}
              className={styles.container__become_img}
              springProps={springProps}
            >
              <Image src="/pcmeneer.gif" alt="computer with a person inside" width={900} height={650} />
            </ParallaxMouse>
          </section>
          <section className={styles.main__container_whatcanido}>
            <div>
              <ParallaxMouse xFactor={-80} className={styles.container__whatcanido_img} springProps={springProps}>
                <Image
                  src="/images/index/paraplu/satelietje.gif"
                  alt="satellite beaming data down"
                  width={1123 * 0.4}
                  height={987 * 0.4}
                />
              </ParallaxMouse>
            </div>
            <section className={styles.container__whatcanido_text}>
              <h2 className={`${styles.whatcanido__text_title} ${styles.title}`}>
                {translations.what.title[toggleLangState]}
              </h2>
              <p className={styles.whatcanido__text_body}>{translations.what.body.p1[toggleLangState]}</p>
              <a href="/secureyourself" className={buttons.button}>
                <div>
                  {translations.what.buttons.main.ctrl[toggleLangState]}{" "}
                  <span className={styles.light}>{translations.what.buttons.main.id[toggleLangState]}</span>
                </div>
              </a>
              <p className={styles.whatcanido__text_body}>{translations.what.body.p2[toggleLangState]}</p>
              <a href="/experience" className={`${buttons.button} ${buttons.light}`}>
                {translations.what.buttons.secondary[toggleLangState]}
              </a>
            </section>
          </section>
        </Parallax>
      </main>
      <footer className={styles.footer}>
        <div className={styles.threejs__cookie__object__pos2}>
          <ThreejsObjectsMainlow className={styles.threejs__object} />
        </div>
        <div className={styles.footer__img}>
          <Image
            src="/images/index/paraplu/paraplu.png"
            alt="woman with umbrella shielding her from the data from the satellite"
            width={582 * 0.5}
            height={1137 * 0.5}
          />
        </div>
        <div className={styles.footer__logo}>
          <Image src="/lion_icon.svg" alt={"Logo of the Flemish Government"} width={180} height={250} />
          <p className={styles.footer__logo_sub}>
            {translations.footer.support.p1[toggleLangState]}
            <br />
            {translations.footer.support.p2[toggleLangState]}
          </p>
        </div>
        <div className={styles.footer__text}>
          <h2 className={styles.footer__title}>Integration 4</h2>
          <p className={styles.footer__body}>{translations.footer.experience[toggleLangState]}</p>
          <ul className={styles.footer__names}>
            <li className={styles.footer__names_name}>Noa Lambert</li>
            <li className={styles.footer__names_spacer}>
              <Image src="/footerlistdot.svg" alt="orange delimiter dot" width={15} height={15} />
            </li>
            <li className={styles.footer__names_name}>Kenzo Dewaegenaere</li>
            <li className={styles.footer__names_spacer}>
              <Image src="/footerlistdot.svg" alt="orange delimiter dot" width={15} height={15} />
            </li>
            <li className={styles.footer__names_name}>Samuel Vanhaecke</li>
          </ul>
          <div className={styles.footer__bg}></div>
        </div>
      </footer>
    </>
  );
}
