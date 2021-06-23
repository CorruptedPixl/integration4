import styles from "../styles/Secureyourself.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import Scanner from "../components/Scanner";
import ThreejsCookieObject from "../components/ThreejsCookieObject.js";
import translations from "../translations/secureyourself.json";
import Toggle from "../components/Toggle";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ParallaxMouse from "../components/ParallaxMouse";
import Console from "../components/Console";
import Navbar from "../components/Navbar";
import StudentBanner from "../components/StudentBanner";

export default function secureyourself() {
  const [socket, setSocket] = useState();
  const [toggleLangState, setToggleLangState] = useState("en");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [visitorData, setVisitorData] = useState();
  const [weatherData, setWeatherData] = useState();

  const handleClickScan = () => {
    setScannerVisible(!scannerVisible);
    socket.emit("consoleMessage", "A user is scanning themselves");
  };

  {
    weatherData && socket.emit("consoleMessage", `A user from ${weatherData.name} finished a scan`);
  }

  return (
    <>
      <Helmet>
        <html lang={toggleLangState} />
      </Helmet>
      <Head>
        <title>ctrl. | Secure Yourself</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Sam during their time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>
      <main className={styles.main__container}>
        <StudentBanner />
        <Navbar>
          <Toggle
            toggleState={toggleLangState}
            setToggleState={setToggleLangState}
            valueLeft={"nl"}
            valueRight={"en"}
          />
        </Navbar>
        <Console socket={socket} setSocket={setSocket} />
        <section className={styles.main__container_mydata}>
          <h2
            data-text={translations.scanner.title[toggleLangState]}
            className={`${styles.container__mydata_title} ${styles.title}`}
          >
            {translations.scanner.title[toggleLangState]}
          </h2>
          {scannerVisible ? (
            <Scanner setVisitorData={setVisitorData} setExtWeatherData={setWeatherData} currentLang={toggleLangState} />
          ) : (
            <section className={styles.container__mydata_contents}>
              <h3 className={styles.hidden}>Explanation about securing yourself</h3>
              <div className={styles.container__mydata_text}>
                <p className={styles.mydata__text_paragraph}>{translations.scanner.desc.p1[toggleLangState]}</p>
                <p className={styles.mydata__text_paragraph}>{translations.scanner.desc.p2[toggleLangState]}</p>
                <button className={`${styles.button} ${styles.mydata__text_button}`} onClick={handleClickScan}>
                  {translations.scanner.button[toggleLangState]}
                </button>
              </div>
              <div className={styles.container__mydata_img}>
                <Image
                  src="/images/secureyourself/trackme/tackme2.gif"
                  alt="2 girls on a computer that is connected to a building"
                  width={700}
                  height={730}
                ></Image>
              </div>
            </section>
          )}
        </section>
        <section className={styles.cookie__container}>
          <div className={styles.main__container_intro}>
            <h2
              data-text={`${translations.cookies.title.p1[toggleLangState]} ${translations.cookies.title.p1_highlight[toggleLangState]} ${translations.cookies.title.p2[toggleLangState]}`}
              className={`${styles.container__intro_title} ${styles.title}`}
            >
              {translations.cookies.title.p1[toggleLangState]}
              <span className={styles.highlight}> {translations.cookies.title.p1_highlight[toggleLangState]} </span>
              {translations.cookies.title.p2[toggleLangState]}
            </h2>
            <p className={styles.container__intro_text}>
              {translations.cookies.desc.p1[toggleLangState]}
              <b> {translations.cookies.desc.p1_bold[toggleLangState]} </b>
              {translations.cookies.desc.p2[toggleLangState]}{" "}
              <b> {translations.cookies.desc.p2_bold[toggleLangState]} </b>{" "}
              {translations.cookies.desc.p3[toggleLangState]}
            </p>
            <div className={styles.container__intro_expl}>
              <h3 className={styles.intro__expl_title}>
                {translations.cookies.subtitle.p1[toggleLangState]}
                <span className={styles.highlight}> {translations.cookies.subtitle.p1_highlight[toggleLangState]}</span>
              </h3>
              <p className={styles.intro__expl_text}>
                {translations.cookies.expl.p1[toggleLangState]}
                <b> {translations.cookies.expl.p1_bold[toggleLangState]} </b>
                {translations.cookies.expl.p2[toggleLangState]}
              </p>
              <p className={styles.intro__expl_text}>
                {translations.cookies.expl.p3[toggleLangState]}
                <b> {translations.cookies.expl.p3_bold[toggleLangState]} </b>
                {translations.cookies.expl.p4[toggleLangState]}
              </p>
              <p className={styles.intro__expl_text}>{translations.cookies.expl.p5[toggleLangState]}</p>
            </div>
          </div>
          <div className={styles.threejs__cookie__object__pos}>
            <ThreejsCookieObject className={styles.threejs__cookie__object} />
          </div>
        </section>

        <section className={styles.main__container_tips}>
          <div className={styles.container__tips_bg}>
            <Image src="/tips_bg.svg" alt="background for the tips" width={1920} height={2211}></Image>
          </div>
          <h2 className={`${styles.container__tips_title} ${styles.title}`}>
            {translations.tips.title[toggleLangState]}
          </h2>
          <p className={styles.container__tips_text}>{translations.tips.subtitle[toggleLangState]}</p>
          <ul className={styles.container__tips_list}>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip1.title[toggleLangState]}</h3>
              <div className={styles.tip__img_container}>
                <Image
                  className={styles.list__tip_img}
                  src="/adblocker.svg"
                  alt="adblocker logo"
                  width={170}
                  height={180}
                ></Image>
              </div>
              <p className={styles.list__tip_text}>{translations.tips.tip1.subtitle[toggleLangState]}</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip2.title[toggleLangState]}</h3>
              <div className={styles.tip__img_container}>
                <Image className={styles.list__tip_img} src="/cookie.svg" alt="cookie" width={170} height={180}></Image>
              </div>
              <p className={styles.list__tip_text}>{translations.tips.tip2.subtitle[toggleLangState]}</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip3.title[toggleLangState]}</h3>
              <div className={styles.tip__img_container}>
                <Image
                  className={styles.list__tip_img}
                  src="/incognito.svg"
                  alt="incognito mask"
                  width={180}
                  height={180}
                ></Image>
              </div>
              <p className={styles.list__tip_text}>{translations.tips.tip3.subtitle[toggleLangState]}</p>
            </li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
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
      </footer>
    </>
  );
}
