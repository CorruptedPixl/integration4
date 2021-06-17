import styles from "../styles/Experience.module.scss";
import buttons from "../styles/Buttons.module.scss";
import Image from "next/image";
import { gsap } from "gsap";
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import { useEffect } from "react";
import ParallaxMouse from "../components/ParallaxMouse";

const experience = () => {
  const [vw, setVw] = useState();
  const [vh, setVh] = useState();

  const adImageArray = new Array("cars.png", "cats.png", "clothing.png", "food.png", "singles.png");
  const [adImage, setAdImage] = useState();

  // Set adImage every 10 seconds

  /*const handleAdImage = () => {
    setTimeout(function () {
      let whichImage = adImageArray[Math.round(Math.random() * (adImageArray.length - 1))];
      setAdImage(whichImage);
      console.log("setting image");
    }, 10000);
  };*/

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);

    let whichImage = adImageArray[Math.round(Math.random() * (adImageArray.length - 1))];
    setAdImage(whichImage);
  });

  const [experience, setExperience] = useState(false);

  const handleExperienceStart = () => {
    setExperience(true);
  };

  const handleAdImage = (selected, e) => {
    console.log(selected);
    console.log(adImage);
    console.log(e.target);

    if (selected === adImage) {
      e.target.classList.add(styles.correct);
      setTimeout(function () {
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
      console.log("nah G");
      setTimeout(function () {
        e.target.classList.remove(styles.wrong);
      }, 500);
    }
  };

  const handleFoodAd = (e) => {
    e.target.classList.add(styles.correct);
    setTimeout(function () {
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
    setTimeout(function () {
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
    if (data.direction === "right") {
      gsap.to(data.first, { duration: 1, x: -2 * vw });
      gsap.to(data.second, { duration: 1, x: -vw });
    } else if (data.direction === "down") {
      gsap.to(data.first, { duration: 1, y: -2 * vh });
      gsap.to(data.second, { duration: 1, y: -vh });
    } else if (data.direction === "left") {
      gsap.to(data.first, { duration: 1, x: +2 * vw });
      gsap.to(data.second, { duration: 1, x: +vw });
    } else if (data.direction === "left_down") {
      gsap.to(data.first, { duration: 1, x: +2 * vw, y: -2 * vh });
      gsap.to(data.second, { duration: 1, x: +vw, y: -vh });
    } else {
      console.log("Movement Error");
    }

    gsap.to("#experience_path", { duration: 1, x: -data.path_inc_x * vw, y: data.path_inc_y * vh });
  };
  return (
    <>
      <main className={styles.main__container}>
        {!experience ? (
          <section className={styles.main__container_intro}>
            <h2 className={styles.title}>Welcome ... are you ready to become Big Brother?</h2>
            <p className={styles.container__intro_text}>
              Let’s take a dive into the algorithm and get to know Sam from the data that’s being tracked. Your name
              will be used to personalize this webpage locally and will not be sent to our servers.
            </p>
            <button
              onClick={() => handleExperienceStart()}
              className={`${buttons.button} ${styles.container__intro_button}`}
            >
              Start the experience
            </button>
            <small className={styles.container__intro_disclaimer}>
              By continuing you accept the necessary cookies to make this experience work
            </small>
            <Image src="/experience/sound_on.svg" width="56px" height="51px"></Image>
            <p className={styles.container__intro_info}>
              For the ultimate experience please use sound and disable your add-blocker
            </p>
          </section>
        ) : (
          <>
            <section className={`${styles.experience__step} ${styles.experience__1}`} id="experience__1">
              <h2 className={styles.title}>
                You are right on time, Noa. Sam just accepted <span className={styles.highlight}>cookies</span> again.
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    It’s amazing... Sam just blindly accepted cookies on a website. Looks like we’re gonna get some
                    interesting data to go through.
                  </p>
                  <p>
                    Maybe you don’t know who Sam is but by the end of this you will know more about them than you could
                    ever image. <b className={styles.bold}>Let’s get to know them!</b>
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
                    className={buttons.button}
                  >
                    Start tracking Sam
                  </button>
                </section>
                <Image
                  src="/images/experience/experience_start/cookiestart.webp"
                  alt="Girls riding on a bike with binary code in the wheels"
                  width={420}
                  height={600}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__2}`} id="experience__2">
              <h2 className={styles.title}>
                But first, how do we track Sam? One word: <span className={styles.highlight}>Fingerprints.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Now you are wondering, what are Fingerprints? <br /> Well, it’s basically an unique identifier you
                    get online that tracks every move you make. Consider it a story that never gets deleted and stays on
                    your profile forever.
                  </p>
                  <p>
                    But is it <span className={styles.highlight}>bad?</span> What can they even acces?
                  </p>
                  <p>
                    With every small piece of information we get to know alot of things. Sometimes they ask permission
                    for something that <b className={styles.bold}>you didn’t even know</b> could be taken.
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
                    className={buttons.button}
                  >
                    But what can we track?
                  </button>
                </section>
                <Image
                  src="/images/experience/fingerprinting/dame-met-hondje.png"
                  alt="woman walking a computerdog"
                  width={500}
                  height={630}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__3}`} id="experience__3">
              <h2 className={styles.title}>
                Since he <span className={styles.highlight}>gave acces</span> we can track... pretty much
                <span className={styles.highlight}>#anything</span>.
              </h2>
              <section className={styles.experience__step_content}>
                <Image
                  src="/images/experience/locked/lock.gif"
                  alt="padlock with data behind it"
                  width={740}
                  height={500}
                ></Image>
                <section className={`${styles.step__content_text} ${styles.right}`}>
                  <p>
                    Once you accept cookies you basically give that site a key to your{" "}
                    <b className={styles.bold}>private interests</b>, let them create a profile and they can track you{" "}
                    <b className={styles.bold}>even further</b>.
                  </p>
                  <p>
                    It's like <span className={styles.highlight}>adding</span> them to your best friends.
                  </p>
                  <button className={`${styles.button} ${styles.light}`}>What does this do?</button>
                  <button
                    onClick={() =>
                      handleMovement({
                        first: "#experience__3",
                        second: "#experience__4",
                        direction: "right",
                        path_inc_x: "3",
                      })
                    }
                    className={buttons.button}
                  >
                    Let's unlock some data
                  </button>
                </section>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__4}`} id="experience__4">
              <h2 className={styles.title}>
                Do you realize that <span className={styles.highlight}>every move</span> you make gets stored in a
                profile.
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Everything you do online is being tracked and stored in your unique profile. Companies use these
                    profiles to target ads, we can compare it a bit to a social media account that you have no ctrl.
                    over.
                  </p>
                  <p>Shall we take a look at what we can gather?</p>
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
                    className={buttons.button}
                  >
                    Generate Sam's profile
                  </button>
                </section>
                <Image
                  src="/images/experience/bunny/bunny.gif"
                  alt="bunny taking photograph of a model"
                  width={900}
                  height={600}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__5}`} id="experience__5">
              <h2 className={styles.title}>
                Done!
                <br />
                Well I guess you can <span>see what Sam's doing.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <Image
                  src={`/images/experience/guessthead/${adImage}`}
                  alt="guy sitting on a computer that displays an ad"
                  width={500}
                  height={560}
                ></Image>
                <section className={styles.step__content_text}>
                  <p>
                    Let’s see how good you are at targeting ads. Let’s send Sam ads based on things they search online.
                    Have a look at the screen and send the right ad, but make sure to do it at the right time!
                  </p>
                  <div className={styles.content__text_selection}>
                    <p className={styles.text__selection_adv}>Advertise</p>
                    <ul className={styles.text__selection_list}>
                      <li className={styles.selection__list_item} onClick={(e) => handleAdImage("clothing.png", e)}>
                        clothing
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleAdImage("cars.png", e)}>
                        cars
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleAdImage("cats.png", e)}>
                        cats
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleAdImage("food.png", e)}>
                        food
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleAdImage("dating.png", e)}>
                        dating
                      </li>
                    </ul>
                  </div>
                </section>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__6}`} id="experience__6">
              <h2 className={styles.title}>
                Nice, <span className={styles.highlight}>your ad worked</span>, we got him to look at (choice) related
                products!
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    On sites where you watch video’s you probally just skip the ads, that’s why they have to delve
                    deeper. Let me tell you everything about it!
                  </p>
                  <p>
                    This is how we do it with everyone, we watch from a distance, collect everything we can find about
                    them, build their profile and recommend advertisements based on that.
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
                    className={buttons.button}
                  >
                    Skip add
                  </button>
                </section>
                <Image
                  src={`/images/experience/advertisement/${adImage}`}
                  alt="Guy holding up an advertisement"
                  width={560}
                  height={670}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__7}`} id="experience__7">
              <h2 className={styles.title}>
                We can see that Sam <span className={styles.highlight}>lives near Bruges</span> based on their
                <span className={styles.highlight}>IP.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Advertisers can always figure out in wich area you live. Once you accept all cookies they can even
                    track your exact location.
                  </p>
                  <p>After all this cookie-talk Sam might be hungry, would you mind sending some food ads?</p>
                  <div className={styles.content__text_selection}>
                    <p className={styles.text__selection_adv}>Advertise</p>
                    <ul className={styles.text__selection_list}>
                      <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                        McDonalds
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                        UberEats
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                        Pizza.be
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                        Pitta
                      </li>
                      <li className={styles.selection__list_item} onClick={(e) => handleFoodAd(e)}>
                        Aldi
                      </li>
                    </ul>
                  </div>
                </section>
                <Image
                  src="/images/experience/mailbox/mailbox.gif"
                  alt="girls sitting on a mailbox"
                  width={1100}
                  height={800}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__8}`} id="experience__8">
              <h2 className={styles.title}>
                We know Sam has a partner due to their <span className={styles.highlight}>shared IP</span> and
                <span className={styles.highlight}>GPS location.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Not only your <span>online relationship status</span> reveals this.
                  </p>
                  <p>
                    They can track everyone who is using the same internet connection and even suggest ads to others!
                    It’s all linked together like a big group chat.
                  </p>
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
                    className={buttons.button}
                  >
                    Let's help them!
                  </button>
                  <button className={`${styles.button} ${styles.light}`}>Naaaaaah...</button>
                </section>
                <Image
                  src="/images/experience/couple2/couple2.png"
                  alt="Couple talking to eachother"
                  width={600}
                  height={440}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__9}`} id="experience__9">
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <h2 className={styles.title}>
                    Their partner has been looking at <span className={styles.highlight}>wedding rings</span>
                  </h2>
                  <p>
                    Ain’t this a handy piece of information? With some cheeky little advertisements at the right time we
                    could probably get Sam to buy a wedding ring.
                  </p>
                  <p>
                    Wouldn’t that be beautiful?
                    <br />
                    That was a rhetorical question, we don’t care about that, we only care about money.
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
                    className={buttons.button}
                  >
                    Let's make some bank
                  </button>
                </section>
                <Image
                  src="/images/experience/couple1/couple.png"
                  alt="Bride and groom walking hand in hand"
                  width={700}
                  height={900}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__10}`} id="experience__10">
              <h2 className={styles.title}>
                Jewelry stores will be very grateful for these
                <span className={styles.highlight}>potential customers</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Since we have all this power we can even choose from where they will possibly buy the ring, this
                    time there is no right or wrong. Choose which one you think is going to be the best fit.
                  </p>
                </section>
                <div className={styles.content__text_selection}>
                  <p className={styles.text__selection_adv}>Advertise</p>
                  <ul className={styles.text__selection_list}>
                    <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                      Gucci
                    </li>
                    <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                      Swarovski
                    </li>
                    <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                      Cartier
                    </li>
                    <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                      Bvlgari
                    </li>
                    <li className={styles.selection__list_item} onClick={(e) => handleJewelryAd(e)}>
                      Hermès
                    </li>
                  </ul>
                </div>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__11}`} id="experience__11">
              <h2 className={styles.title}>
                I guess it's clear what we can do with <span className={styles.highlight}>your data</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    You can prevent the internet collecting, selling, using your data. <b>Protect yourself</b> against
                    the manipulation of the corporate world. If you want to see all data that is available to the
                    internet at this exact moment, take a look below.
                  </p>
                  <button className={buttons.button}>Show me what you can track</button>
                  <button className={`${buttons.button} ${buttons.light}`}>give me tips!</button>
                </section>
                <div>
                  <Image
                    src="/images/experience/final/final.png"
                    alt="Guy holding up an advertisement"
                    width={400}
                    height={500}
                  ></Image>
                </div>
              </section>
            </section>
            <div className={styles.experience__path} id="experience_path">
              <Image
                src="/images/experience/experience_path.svg"
                width={10770}
                height={5512}
                alt="A path through the whole experience"
              ></Image>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default experience;
