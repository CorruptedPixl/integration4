import styles from "../styles/Home.module.scss";
import buttons from "../styles/Buttons.module.scss";
import Head from "next/head";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ParallaxMouse from "../components/ParallaxMouse";
import Console from "../components/Console";
import Toggle from "../components/Toggle";
import translations from "../translations/index.json";
import parse from "html-react-parser";

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
              <ParallaxMouse xFactor={0} springProps={springProps}>
                <h2 className={`${styles.title} ${styles.container__intro_title}`}>
                  {/* Thought you were safe <br /> surfing <span className={styles.highlight}>the web?</span> */}
                  {parse(
                    `${translations.title.safe[toggleLangState]} <br> ${translations.title.surfing[toggleLangState]} <span className=${styles.highlight}>${translations.title.web[toggleLangState]}</span>`
                  )}
                </h2>
              </ParallaxMouse>
              <p className={styles.container__intro_text}>
                Well you aren't. You're far from safe. Every move you make online is constantly being watched, tracked,
                saved in a profile and used against you to not only show you targeted ads, but in the long term
                influence the way you think.
              </p>
              <ParallaxMouse xFactor={50} springProps={springProps}>
                <section className={styles.container__intro_buttons}>
                  <a
                    href="/experience"
                    onClick={() => socket.emit("consoleMessage", "Nice, it works!")}
                    className={buttons.button}
                  >
                    Experience how they track you
                  </a>
                  <p className={styles.intro__buttons_or}>or</p>
                  <a href="/secureyourself" className={`${buttons.button} ${buttons.dark}`}>
                    Learn to protect yourself
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
                Become the eyes behind <span className={styles.highlight}>everything</span>
              </h2>
              <p className={styles.become__text_body}>
                We've created an experience were we take you through the dark algoritm of the internet. But wait! That's
                not everything we've created a chat system were you can see some "secret" data, and maybe even more...
              </p>
              <h3 className={styles.become__text_h3}>
                Go ahead! Press <span className={styles.highlight}>' / '</span> and find out if you are{" "}
                <span className={styles.highlight}>the only one </span>
                here!
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
              <h2 className={`${styles.whatcanido__text_title} ${styles.title}`}>What can I do?</h2>
              <p className={styles.whatcanido__text_body}>
                Let's delve in the aloritm of cookies and advertisement toghetter, I see Sam might just accept cookies,
                be quick! why are you still reading, let's go!
              </p>
              <p className={styles.whatcanido__text_body}>
                Now you might be wondering what you can do to prevent such activities. Don't worry we've listed
                everything you can do and we created a tool to scan yourself in which you can see everything companies
                can track about you when you accept cookies.
              </p>
              <section className={styles.button__container}>
                <a href="/experience" className={buttons.button}>
                  Let's look at Sam!
                </a>

                <a href="/secureyourself" className={`${buttons.button} ${buttons.light}`}>
                  <div>
                    ctrl. your <span className={styles.highlight}>identity</span>
                  </div>
                </a>
              </section>
            </section>
          </section>
        </Parallax>
        {/*<ThreejsObjects />*/}
      </main>
      <footer className={styles.footer}>
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
            Met steun van
            <br />
            de Vlaamse Overheid
          </p>
        </div>
        <div className={styles.footer__text}>
          <h2 className={styles.footer__title}>Integration 4</h2>
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
        </div>
      </footer>
      {/* </div> */}
    </>
  );
}
