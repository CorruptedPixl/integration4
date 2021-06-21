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

export default function secureyourself() {
  const [socket, setSocket] = useState();
  const [toggleLangState, setToggleLangState] = useState("en");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [visitorData, setVisitorData] = useState();

  const handleClickScan = () => {
    setScannerVisible(!scannerVisible);
  };

  return (
    <>
      <Head>
        <title>ctrl. | Secure Yourself</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Sam during their time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>
      <main className={styles.main__container}>
        <Toggle
          className={styles.toggleSwitch}
          toggleState={toggleLangState}
          setToggleState={setToggleLangState}
          valueLeft={"nl"}
          valueRight={"en"}
        />
        {/*<Console socket={socket} setSocket={setSocket} />*/}
        <section className={styles.main__container_mydata}>
          <h2 className={`${styles.container__mydata_title} ${styles.title}`}>
            {translations.scanner.title[toggleLangState]}
          </h2>
          {scannerVisible ? (
            <Scanner setVisitorData={setVisitorData} />
          ) : (
            <>
              <section className={styles.container__mydata_contents}>
                <section className={styles.container__mydata_text}>
                  <p className={styles.mydata__text_paragraph}>{translations.scanner.desc.p1[toggleLangState]}</p>
                  <p className={styles.mydata__text_paragraph}>{translations.scanner.desc.p2[toggleLangState]}</p>
                  <button className={`${styles.button} ${styles.mydata__text_button}`} onClick={handleClickScan}>
                    {translations.scanner.button[toggleLangState]}
                  </button>
                </section>
                <div className={styles.container__mydata_img}>
                  <Image src="/images/secureyourself/trackme/tackme2.gif" width={700} height={730}></Image>
                </div>
              </section>
            </>
          )}
        </section>

        <section className={styles.cookie__container}>
          <section className={styles.main__container_intro}>
            <h2 className={`${styles.container__intro_title} ${styles.title}`}>
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
            <section className={styles.container__intro_expl}>
              <h2 className={styles.intro__expl_title}>
                {translations.cookies.subtitle.p1[toggleLangState]}
                <span className={styles.highlight}>{translations.cookies.subtitle.p1_highlight[toggleLangState]}</span>?
              </h2>
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
            </section>
          </section>
          <div className={styles.threejs__cookie__object__pos}>
            <ThreejsCookieObject className={styles.threejs__cookie__object} />
          </div>
        </section>

        <section className={styles.main__container_tips}>
          <div className={styles.container__tips_bg}>
            <Image src="/tips_bg.svg" width={1920} height={2211}></Image>
          </div>
          <h2 className={`${styles.container__tips_title} ${styles.title}`}>
            {translations.tips.title[toggleLangState]}
          </h2>
          <p className={styles.container__tips_text}>{translations.tips.subtitle[toggleLangState]}</p>
          <ul className={styles.container__tips_list}>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip1.title[toggleLangState]}</h3>
              <Image className={styles.list__tip_img} src="/adblocker.svg" width={170} height={180}></Image>
              <p className={styles.list__tip_text}>{translations.tips.tip1.subtitle[toggleLangState]}</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip2.title[toggleLangState]}</h3>
              <Image className={styles.list__tip_img} src="/cookie.svg" width={170} height={180}></Image>
              <p className={styles.list__tip_text}>{translations.tips.tip2.subtitle[toggleLangState]}</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>{translations.tips.tip3.title[toggleLangState]}</h3>
              <Image className={styles.list__tip_img} src="/incognito.svg" width={180} height={180}></Image>
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
