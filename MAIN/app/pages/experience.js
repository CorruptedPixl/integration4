import styles from "../styles/Experience.module.scss";
import buttons from "../styles/Buttons.module.scss";
import Head from "next/head";
import Image from "next/image";

import { gsap } from "gsap";
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Toggle from "../components/Toggle";
import Console from "../components/Console";
import ParallaxMouse from "../components/ParallaxMouse";
import Scanner from "../components/Scanner";
import translations from "../translations/experience.json";

const experience = () => {
  // Initialize Spring for mouse parallax
  const [springProps, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 600, friction: 100 },
  }));

  const fsHandle = useFullScreenHandle(); // Handle for Fullscreen
  const [socket, setSocket] = useState(); // Saves socket connection
  const [toggleLangState, setToggleLangState] = useState("en"); // Default language

  const [vw, setVw] = useState();
  const [vh, setVh] = useState();

  // Ad image array with path and translations built in, easier than linking through multiple files
  const adImageArray = [
    {
      path: "cars.png",
      en: "car",
      nl: "auto",
    },
    {
      path: "cats.png",
      en: "cat",
      nl: "katten",
    },
    {
      path: "clothing.png",
      en: "clothing",
      nl: "kledij",
    },
    {
      path: "food.png",
      en: "food",
      nl: "eten",
    },
    {
      path: "singles.png",
      en: "dating",
      nl: "dating",
    },
  ];
  const [adImage, setAdImage] = useState();

  const [bgMusic, setBgMusic] = useState(false);
  const [musicButton, setMusicButton] = useState("sound_off");

  const handleBgMusic = () => {
    socket.emit("consoleMessage", "A user toggled sound in the experience");
    if (bgMusic === true) {
      setBgMusic(false);
      setMusicButton("sound_off");
    } else {
      setBgMusic(true);
      setMusicButton("sound_on");
    }
  };

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);

    let whichImage = adImageArray[Math.round(Math.random() * (adImageArray.length - 1))];
    setAdImage(whichImage);
  }, []);

  const [experience, setExperience] = useState(false);

  const handleExperienceStart = () => {
    setExperience(true);
    if (vw < 640) {
      fsHandle.enter();
    }
    socket.emit("consoleMessage", "A user started the experience");
  };

  const handleAdImage = (selected, e) => {
    if (selected === adImage.path || vw < 640) {
      e.target.classList.add(styles.correct);
      setTimeout(() => {
        e.target.classList.remove(styles.correct);
        handleMovement({
          first: "#experience__5",
          second: "#experience__6",
          direction: "left_down",
          path_inc_x: "2",
          path_inc_y: "-2",
        });
      }, 500);
    } else {
      e.target.classList.add(styles.wrong);
      console.warn("Wrong ad, try again");
      socket.emit("consoleMessage", "A user failed to show the right ad to Sam");
      setTimeout(() => {
        e.target.classList.remove(styles.wrong);
      }, 500);
    }
  };

  const handleFoodAd = (e) => {
    e.target.classList.add(styles.correct);
    setTimeout(() => {
      e.target.classList.remove(styles.correct);
      handleMovement({
        first: "#experience__7",
        second: "#experience__8",
        direction: "left_down",
        path_inc_x: "0",
        path_inc_y: "-4",
      });
    }, 500);
  };

  const handleJewelryAd = (e) => {
    e.target.classList.add(styles.correct);
    setTimeout(() => {
      e.target.classList.remove(styles.correct);
      handleMovement({
        first: "#experience__10",
        second: "#experience__11",
        direction: "right",
        path_inc_x: "3",
        path_inc_y: "-4.8",
      });
    }, 500);
  };

  const handleMovement = (data) => {
    if (vw < 640) {
      // Fix for mobile vh not being read correctly
      gsap.to(data.first, { duration: 1, y: -2 * window.innerHeight });
      gsap.to(data.second, { duration: 1, y: -window.innerHeight });
    } else {
      switch (data.direction) {
        case "right":
          gsap.to(data.first, { duration: 1, x: -2 * vw });
          gsap.to(data.second, { duration: 1, x: -vw });
          break;
        case "down":
          gsap.to(data.first, { duration: 1, y: -2 * vh });
          gsap.to(data.second, { duration: 1, y: -vh });
          break;
        case "left":
          gsap.to(data.first, { duration: 1, x: +2 * vw });
          gsap.to(data.second, { duration: 1, x: +vw });
          break;
        case "left_down":
          gsap.to(data.first, { duration: 1, x: +2 * vw, y: -2 * vh });
          gsap.to(data.second, { duration: 1, x: +vw, y: -vh });
          break;

        default:
          console.warn("Movement Error");
          break;
      }

      gsap.to("#experience_path", { duration: 1, x: -data.path_inc_x * vw, y: data.path_inc_y * vh });
    }
  };
  return (
    <>
      <Head>
        <title>ctrl. | Experience</title>
        <meta
          name="description"
          content="ctrl. exposes what sites can track of you and how they do it. Experience the internet from the other side of the screen, become the algorithm and track Sam during their time online."
        />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>
      <FullScreen handle={fsHandle}>
        <ParallaxMouse xFactor={50} springProps={springProps}></ParallaxMouse>
        <main className={styles.main__container}>
          <Console socket={socket} setSocket={setSocket} />
          <Scanner visible={false} />
          <div className={styles.button__container}>
            <a
              href="/"
              onClick={() => socket.emit("consoleMessage", "A user left the experience")}
              className={styles.exit__experience}
            >
              {translations.exit[toggleLangState]}
            </a>
            <Toggle
              className={styles.toggleSwitch}
              toggleState={toggleLangState}
              setToggleState={setToggleLangState}
              valueLeft={"nl"}
              valueRight={"en"}
            />
          </div>
          {bgMusic ? (
            <audio controls loop autoPlay hidden>
              <source src="music/int4-bg.mp3" type="audio/mp3" />
            </audio>
          ) : null}
          {!experience ? (
            <section className={styles.main__container_intro}>
              <h2 className={styles.title}>{translations.intro.title[toggleLangState]}</h2>
              <div className={styles.container__intro_text}>
                <p>{translations.intro.description.track[toggleLangState]} </p>
                <p>
                  {translations.intro.console.p1[toggleLangState]} <span className={styles.highlight}>"/"</span>{" "}
                  {translations.intro.console.p2[toggleLangState]}
                </p>
              </div>
              <button
                onClick={() => handleExperienceStart()}
                className={`${buttons.button} ${styles.container__intro_button}`}
              >
                {translations.intro.button[toggleLangState]}
              </button>
              <small className={styles.container__intro_disclaimer}>{translations.intro.accept[toggleLangState]}</small>
              <div className={styles.music__experience} onClick={() => handleBgMusic()}>
                <Image src={`/images/experience/${musicButton}.svg`} width="56px" height="51px"></Image>
              </div>
              <p className={styles.container__intro_info}>{translations.intro.experience[toggleLangState]}</p>
            </section>
          ) : (
            <>
              <div className={`${styles.music__experience} ${styles.fixed}`} onClick={() => handleBgMusic()}>
                <Image src={`/images/experience/${musicButton}.svg`} width="56px" height="51px"></Image>
              </div>
              <section className={`${styles.experience__step} ${styles.experience__1}`} id="experience__1">
                <h2 className={styles.title}>
                  {translations.step1.title.p1[toggleLangState]} <span className={styles.highlight}>cookies</span>{" "}
                  {translations.step1.title.p2[toggleLangState]}
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step1.description.p1[toggleLangState]}</p>
                    <p>
                      {translations.step1.description.p2[toggleLangState]}{" "}
                      <b className={styles.bold}>{translations.step1.description.p2_1[toggleLangState]}</b>
                    </p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__1",
                          second: "#experience__2",
                          direction: "right",
                          path_inc_x: "1",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step1.button[toggleLangState]}
                    </button>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/experience_start/cookiestart.webp"
                      alt="Girls riding on a bike with binary code in the wheels"
                      width={420}
                      height={600}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__2}`} id="experience__2">
                <h2 className={styles.title}>
                  {translations.step2.title.p1[toggleLangState]}{" "}
                  <span className={styles.highlight}>{translations.step2.title.p2[toggleLangState]}</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>
                      {translations.step2.description.p1[toggleLangState]}
                      <br />
                      {translations.step2.description.p2[toggleLangState]}
                    </p>
                    <h3 className={styles.inner__title}>
                      {translations.step2.description.subtitle.p1[toggleLangState]}
                      <span className={styles.highlight}>
                        {" "}
                        {translations.step2.description.subtitle.highlight[toggleLangState]}
                      </span>{" "}
                      {translations.step2.description.subtitle.p2[toggleLangState]}
                    </h3>
                    <p>
                      {translations.step2.description.p3[toggleLangState]}
                      <b className={styles.bold}> {translations.step2.description.p3_bold[toggleLangState]}</b>{" "}
                      {translations.step2.description.p4[toggleLangState]}
                    </p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__2",
                          second: "#experience__3",
                          direction: "right",
                          path_inc_x: "2",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step2.button[toggleLangState]}
                    </button>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/fingerprinting/dame-met-hondje.png"
                      alt="woman walking a computerdog"
                      width={500}
                      height={630}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__3}`} id="experience__3">
                <h2 className={styles.title}>
                  {translations.step3.title.p1[toggleLangState]}
                  <span className={styles.highlight}>
                    {" "}
                    {translations.step3.title.p1_highlight[toggleLangState]}
                  </span>{" "}
                  {translations.step3.title.p2[toggleLangState]}
                  <span className={styles.highlight}> {translations.step3.title.p2_highlight[toggleLangState]}</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <div className={`${styles.step__content_img} ${styles.visible}`}>
                    <Image
                      src="/images/experience/locked/lock.gif"
                      alt="padlock with data behind it"
                      width={760}
                      height={520}
                    ></Image>
                  </div>

                  <section className={`${styles.step__content_text} ${styles.acces}`}>
                    <p>
                      {translations.step3.description.p1[toggleLangState]}{" "}
                      <b className={styles.bold}>{translations.step3.description.p1_bold[toggleLangState]} </b>{" "}
                      {translations.step3.description.p2[toggleLangState]}{" "}
                      <b className={styles.bold}>{translations.step3.description.p2_bold[toggleLangState]}</b>
                    </p>
                    <h3 className={styles.inner__title}>
                      {translations.step3.description.subtitle.p1[toggleLangState]}{" "}
                      <span className={styles.highlight}>
                        {translations.step3.description.subtitle.highlight[toggleLangState]}
                      </span>{" "}
                      {translations.step3.description.subtitle.p2[toggleLangState]}
                    </h3>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__3",
                          second: "#experience__4",
                          direction: "right",
                          path_inc_x: "3",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step3.button[toggleLangState]}
                    </button>
                  </section>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__4}`} id="experience__4">
                <h2 className={styles.title}>
                  {translations.step4.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step4.title.p1_highlight[toggleLangState]} </span>
                  {translations.step4.title.p2[toggleLangState]}
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step4.description.p1[toggleLangState]}</p>
                    <p>{translations.step4.description.subtitle[toggleLangState]}</p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__4",
                          second: "#experience__5",
                          direction: "down",
                          path_inc_x: "3",
                          path_inc_y: "-1",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step4.button[toggleLangState]}
                    </button>
                  </section>
                  <div className={`${styles.bunnyPicture} ${styles.visible} ${styles.step__content_img}`}>
                    <Image
                      src="/images/experience/bunny/bunny.gif"
                      alt="bunny taking photograph of a model"
                      width={1000}
                      height={500}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__5}`} id="experience__5">
                <h2 className={`${styles.title} ${styles.ad}`}>
                  {translations.step5.title.p1[toggleLangState]}
                  <br />
                  {translations.step5.title.p2[toggleLangState]}
                  <span className={styles.highlight}> {translations.step5.title.p2_highlight[toggleLangState]}</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <div className={styles.step__content_img}>
                    <Image
                      src={`/images/experience/guessthead/${adImage.path}`}
                      alt="guy sitting on a computer that displays an ad"
                      width={500}
                      height={560}
                    ></Image>
                  </div>
                  <section className={styles.step__content_text}>
                    <p>
                      {translations.step5.description.p1[toggleLangState]}{" "}
                      {translations.step5.description.p2[toggleLangState]}{" "}
                      <b className={styles.highlight}> {translations.step5.description.p2_bold[toggleLangState]} </b>
                      {translations.step5.description.p3[toggleLangState]}
                    </p>
                    <div className={styles.content__text_selection}>
                      <p className={styles.text__selection_adv}>{translations.step5.ads.adv[toggleLangState]}</p>
                      <ul className={styles.text__selection_list}>
                        <li className={styles.selection__list_item} onClick={(e) => handleAdImage("clothing.png", e)}>
                          {translations.step5.ads.clothing[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleAdImage("cars.png", e)}>
                          {translations.step5.ads.cars[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleAdImage("cats.png", e)}>
                          {translations.step5.ads.cats[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleAdImage("food.png", e)}>
                          {translations.step5.ads.food[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleAdImage("dating.png", e)}>
                          {translations.step5.ads.dating[toggleLangState]}
                        </li>
                      </ul>
                    </div>
                  </section>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__6}`} id="experience__6">
                <h2 className={styles.title}>
                  {translations.step6.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step6.title.p1_highlight[toggleLangState]} </span>
                  {translations.step6.title.p2[toggleLangState]} {adImage[toggleLangState]}{" "}
                  {translations.step6.title.p3[toggleLangState]}
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step6.description.p1[toggleLangState]}</p>
                    <p>
                      <p>{translations.step6.description.p2[toggleLangState]}</p>
                    </p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__6",
                          second: "#experience__7",
                          direction: "left_down",
                          path_inc_x: "1",
                          path_inc_y: "-3",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step6.button[toggleLangState]}
                    </button>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src={`/images/experience/advertisement/${adImage.path}`}
                      alt="Guy holding up an advertisement"
                      width={600}
                      height={670}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__7}`} id="experience__7">
                <h2 className={`${styles.title} ${styles.ad}`}>
                  {translations.step7.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step7.title.p1_highlight[toggleLangState]} </span>
                  {translations.step7.title.p2[toggleLangState]}
                  <span className={styles.highlight}> IP.</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step7.description.p1[toggleLangState]}</p>
                    <p>{translations.step7.description.p2[toggleLangState]}</p>
                    <div className={styles.content__text_selection}>
                      <p className={styles.text__selection_adv}>{translations.step7.ads.adv[toggleLangState]}</p>
                      <ul className={styles.text__selection_list}>
                        <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                          {translations.step7.ads.mcDonalds[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                          {translations.step7.ads.uberEats[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                          {translations.step7.ads.pizzaBe[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                          {translations.step7.ads.pitta[toggleLangState]}
                        </li>
                        <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                          {translations.step7.ads.aldi[toggleLangState]}
                        </li>
                      </ul>
                    </div>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/mailbox/mailbox.gif"
                      alt="girls sitting on a mailbox"
                      width={1100}
                      height={800}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__8}`} id="experience__8">
                <h2 className={styles.title}>
                  {translations.step8.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step8.title.p1_highlight[toggleLangState]} </span>
                  {translations.step8.title.p2[toggleLangState]}
                  <span className={styles.highlight}> {translations.step8.title.p2_highlight[toggleLangState]}</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <h3 className={styles.inner__title}>
                      {translations.step8.description.p1[toggleLangState]}
                      <span className={styles.highlight}>
                        {" "}
                        {translations.step8.description.p1_highlight[toggleLangState]}{" "}
                      </span>
                      {translations.step8.description.p2[toggleLangState]}
                    </h3>
                    <p>{translations.step8.description.p3[toggleLangState]}</p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__8",
                          second: "#experience__9",
                          direction: "down",
                          path_inc_x: "1",
                          path_inc_y: "-5",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step8.button[toggleLangState]}
                    </button>
                    {/*<button className={`${buttons.button} ${buttons.light} ${buttons.bottom}`}>Naaaaaah...</button>*/}
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/couple2/couple2.png"
                      alt="Couple talking to eachother"
                      width={600}
                      height={440}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__9}`} id="experience__9">
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <h2 className={styles.title}>
                      {translations.step9.title.p1[toggleLangState]}
                      <span className={styles.highlight}>
                        {" "}
                        {translations.step9.title.p1_highlight[toggleLangState]}{" "}
                      </span>
                    </h2>
                    <p>
                      {translations.step9.description.p1[toggleLangState]}
                      {translations.step9.description.p2[toggleLangState]}
                    </p>
                    <p>
                      {translations.step9.description.p3[toggleLangState]}
                      <br />
                      {translations.step9.description.p4[toggleLangState]}
                    </p>
                    <button
                      onClick={() =>
                        handleMovement({
                          first: "#experience__9",
                          second: "#experience__10",
                          direction: "right",
                          path_inc_x: "2",
                          path_inc_y: "-4.8",
                        })
                      }
                      className={`${buttons.button} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step9.button[toggleLangState]}
                    </button>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/couple1/couple.png"
                      alt="Bride and groom walking hand in hand"
                      width={700}
                      height={900}
                    ></Image>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__10}`} id="experience__10">
                <h2 className={`${styles.title} ${styles.ad}`}>
                  {translations.step10.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step10.title.p1_highlight[toggleLangState]}</span>
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step10.description.p1[toggleLangState]}</p>
                  </section>
                  <div className={styles.content__text_selection}>
                    <p className={styles.text__selection_adv}>{translations.step10.ads.adv[toggleLangState]}</p>
                    <ul className={styles.text__selection_list}>
                      <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                        {translations.step10.ads.gucci[toggleLangState]}
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                        {translations.step10.ads.swarovski[toggleLangState]}
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                        {translations.step10.ads.cartier[toggleLangState]}
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                        {translations.step10.ads.bvlgari[toggleLangState]}
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                        {translations.step10.ads.hermes[toggleLangState]}
                      </li>
                    </ul>
                  </div>
                </section>
              </section>
              <section className={`${styles.experience__step} ${styles.experience__11}`} id="experience__11">
                <h2 className={styles.title}>
                  {translations.step11.title.p1[toggleLangState]}
                  <span className={styles.highlight}> {translations.step10.title.p1_highlight[toggleLangState]} </span>
                </h2>
                <section className={styles.experience__step_content}>
                  <section className={styles.step__content_text}>
                    <p>{translations.step11.description.p1[toggleLangState]}</p>
                    <p>
                      <b className={styles.bold}> {translations.step11.description.p1_bold[toggleLangState]} </b>
                      {translations.step11.description.p2[toggleLangState]}
                    </p>
                    <a href="/secureyourself#scanner" className={buttons.button}>
                      {translations.step11.buttons.primary[toggleLangState]}
                    </a>
                    <a
                      href="/secureyourself#tips"
                      className={`${buttons.button} ${buttons.light} ${buttons.bottom} ${styles.fixed}`}
                    >
                      {translations.step11.buttons.secondary[toggleLangState]}
                    </a>
                  </section>
                  <div className={styles.step__content_img}>
                    <Image
                      src="/images/experience/final/final.png"
                      alt="Guy sitting on a server"
                      width={400}
                      height={500}
                    ></Image>
                  </div>
                </section>
              </section>
              <img
                id="experience_path"
                className={styles.experience__path}
                src="/images/experience/experience_path.svg"
                alt="A path through the whole experience"
              ></img>
            </>
          )}
        </main>
      </FullScreen>
    </>
  );
};

export default experience;
