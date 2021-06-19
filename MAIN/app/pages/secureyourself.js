import styles from "../styles/Secureyourself.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import Scanner from "../components/Scanner";
import ThreejsCookieObject from "../components/ThreejsCookieObject.js";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ParallaxMouse from "../components/ParallaxMouse";
import Console from "../components/Console";

export default function secureyourself() {
  const [socket, setSocket] = useState();
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
        <Console socket={socket} setSocket={setSocket} />
        <section className={styles.main__container_mydata}>
          <h2 className={`${styles.container__mydata_title} ${styles.title}`}>
            Let's find out what we know about you!
          </h2>
          {scannerVisible ? (
            <Scanner setVisitorData={setVisitorData} />
          ) : (
            <>
              <section className={styles.container__mydata_contents}>
                <section className={styles.container__mydata_text}>
                  <p className={styles.mydata__text_paragraph}>
                    It’s common sense that we like our privacy isn’t it? Sometimes it feels like google knows what we
                    really want. isn’t that a bit scary?
                  </p>
                  <p className={styles.mydata__text_paragraph}>
                    If you want to know the things we’ve tracked about you, you can track all your data right now. You
                    can also see what’s happening right now by pressing F1 and find some dark secrets.
                  </p>
                  <button className={`${styles.button} ${styles.mydata__text_button}`} onClick={handleClickScan}>
                    Scan my data now
                  </button>
                </section>
                <div className={styles.container__mydata_img}>
                  <Image src="/trackme.png" width={700} height={730}></Image>
                </div>
              </section>
            </>
          )}
        </section>

        <section className={styles.cookie__container}>
          <section className={styles.main__container_intro}>
            <h2 className={`${styles.container__intro_title} ${styles.title}`}>
              Let's grab some <span className={styles.highlight}>cookies</span> and talk about it
            </h2>
            <p className={styles.container__intro_text}>
              Before we give you tips on what you can do to <b>prevent</b> data tracking we want to tell you that{" "}
              <b>not all cookies are bad</b> and most of them are created to give you a better experience.
            </p>
            <section className={styles.container__intro_expl}>
              <h2 className={styles.intro__expl_title}>
                But who doesn't like a <span className={styles.highlight}>cookie</span>?
              </h2>
              <p className={styles.intro__expl_text}>
                There are some cookies that <b>take advantage</b> of your data and that's what we want to protect.
              </p>
              <p className={styles.intro__expl_text}>
                That's why you should always <b>be careful</b> accepting things left, right and center.
              </p>
              <p className={styles.intro__expl_text}>Below we've listed some tips that can help keep your data safe!</p>
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
          <h2 className={`${styles.container__tips_title} ${styles.title}`}>Some tips that can help you right now!</h2>
          <p className={styles.container__tips_text}>
            We've listed some things that will prevent most data tracking. It's a great step towards safer browsing
            through the internet!
          </p>
          <ul className={styles.container__tips_list}>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>Use adblocker</h3>
              <Image className={styles.list__tip_img} src="/adblocker.svg" width={170} height={180}></Image>
              <p className={styles.list__tip_text}>Install an adblocker, this will prevent data tracking.</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>Don't accept all cookies</h3>
              <Image className={styles.list__tip_img} src="/cookie.svg" width={170} height={180}></Image>
              <p className={styles.list__tip_text}>Only accept necessary cookies.</p>
            </li>
            <li className={styles.tips__list_tip}>
              <h3 className={styles.list__tip_title}>Use incognito</h3>
              <Image className={styles.list__tip_img} src="/incognito.svg" width={180} height={180}></Image>
              <p className={styles.list__tip_text}>
                Use incognito if you don't want any cookies, those cookies get deleted when you close the tab.
              </p>
            </li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
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
      </footer>
    </>
  );
}
