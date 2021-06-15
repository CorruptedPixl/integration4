import styles from "../styles/Experience.module.scss";
import Image from "next/image";
import { gsap } from "gsap";
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import { useEffect } from "react";
import ParallaxMouse from "../components/ParallaxMouse";

const experience = () => {
  const [vw, setVw] = useState();
  const [vh, setVh] = useState();

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
  });

  const [experience, setExperience] = useState(false);

  const handleExperienceStart = () => {
    setExperience(true);
  };

  const handleMovement = (data) => {
    console.log(data.first);
    console.log(data.second);
    console.log(data.direction);

    if (data.direction === "right") {
      console.log("going right");
      gsap.to(data.first, { duration: 1, x: -2 * vw });
      gsap.to(data.second, { duration: 1, x: -vw });
    } else if (data.direction === "down") {
      console.log("going down");
      gsap.to(data.first, { duration: 1, y: -2 * vh });
      gsap.to(data.second, { duration: 1, y: -vh });
    } else if (data.direction === "left") {
      console.log("going left");
      gsap.to(data.first, { duration: 1, x: +2 * vw });
      gsap.to(data.second, { duration: 1, x: +vw });
    } else if (data.direction === "left_down") {
      console.log("going left down");
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
              className={`${styles.button} ${styles.container__intro_button}`}
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
                    ever image. Let’s get to know them!
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
                    className={styles.button}
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
                    Cookies alone don’t track you, actually, most of them are used for legitemate purposes such as
                    keeping you logged in, making sure you have access to certain files, and to remember what items you
                    had in your cart so they don’t dissapear on each refresh.
                  </p>
                  <p>
                    “Then why are cookies bad??” I can hear you asking... Well advertisers use cookies to store a unique
                    identifier, also called a fingerprint in that cookie. They get sent along with each request, so they
                    know who you are before you even see the first words appear on the page.
                  </p>
                  <p>
                    Tom’s browser fingerprint is <span className={styles.highlight}>(fpjs fingerprint of user)</span>
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
                    className={styles.button}
                  >
                    Look at what he's doing
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
                Since he <span>gave acces</span> we can track... pretty much everything.
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
                    Tom accepted all cookies, that means first part cookies (usually necessary to make the website work)
                    but also third party one’s that — you guessed it — gather info to track Tom.
                  </p>
                  <p>
                    Well maybe we should take a peek at what he’s doing, it might come in handy when we want to send him
                    some advertisements...
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
                    className={styles.button}
                  >
                    Let's unlock some data
                  </button>
                </section>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__4}`} id="experience__4">
              <h2 className={styles.title}>
                Well yeah that's right <span className={styles.highlight}>every move</span> you make gets stored in a
                profile.
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    The internet doesn’t just look at what you’re doing. It stores all your preferences, interests, ...
                    in your personal profile. That way it’s ready for the next time we need to throw you some ads.
                  </p>
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
                    className={styles.button}
                  >
                    Generate his profile
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
                Well I guess you can <span>see what he's doing.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <Image
                  src="/images/experience/guessthead/cars.png"
                  alt="guy sitting on a computer that displays an ad"
                  width={500}
                  height={560}
                ></Image>
                <section className={styles.step__content_text}>
                  <p>Now that we got his data and created a profile, let’s serve him some ads!</p>
                  <p>
                    You can choose what advertisements we should send him. Keep in mind what he’s looking at to give him
                    the best ads.
                  </p>
                  <button
                    onClick={() =>
                      handleMovement({
                        first: "#experience__5",
                        second: "#experience__6",
                        direction: "left_down",
                        path_inc_x: "2",
                        path_inc_y: "-2",
                      })
                    }
                    className={styles.button}
                  >
                    Advertise ...
                  </button>
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
                    Isn’t that awesome? he’s browsing the cat products we wanted him to look at. We should store his
                    interest in cat products to his personal profile.
                  </p>
                  <p>
                    This is how we do it with everyone, we watch from a distance, collect everything we can find about
                    them, build their profile and recommend advertisements based one that.
                  </p>
                  <p>
                    You ever watch like one video about some obscure topic on Youtube, only to find like 20 of the same
                    recoomendations on the homepage a few hours later?
                  </p>
                  <p>
                    Yep... that's us!
                    <br />
                    That's the algorithm baby!
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
                    className={styles.button}
                  >
                    Skip add
                  </button>
                </section>
                <Image
                  src="/images/experience/advertisement/car.png"
                  alt="Guy holding up an advertisement"
                  width={560}
                  height={670}
                ></Image>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__7}`} id="experience__7">
              <h2 className={styles.title}>
                We see Sam <span className={styles.highlight}>lives near Bruges</span> based on his{" "}
                <span className={styles.highlight}>IP</span> and it's almost dinner time.
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    I know he lives near bruges because of his IP address, it’s pretty easy. I also know that you live
                    in (CITY). That might come in handy in the future but hey... don’t worry about it.
                  </p>
                  <p>
                    In the meantime let’s choose something for him to eat. We know he likes pizza based on his profile,
                    but what do you think he should be offered tonight?
                  </p>
                  <button
                    onClick={() =>
                      handleMovement({
                        first: "#experience__7",
                        second: "#experience__8",
                        direction: "left_down",
                        path_inc_x: "0",
                        path_inc_y: "-4",
                      })
                    }
                    className={styles.button}
                  >
                    Advertise Pizza.be
                  </button>
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
                We know Sam has a partner due to his <span className={styles.highlight}>shared IP</span> and
                <span className={styles.highlight}>GPS location.</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    According to his GPS data (and ‘anonymous’ data from others) Tom’s usually near one single person
                    when he’s at home. Combining this with their facebook relation status, we can figure out they are in
                    a relationship.
                  </p>
                  <p>Maybe we can help them to take the next step, and make some money doing it?</p>
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
                    className={styles.button}
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
                    His partner has been looking at <span className={styles.highlight}>wedding rings</span>
                  </h2>
                  <p>
                    Ain’t this a handy piece of information? With some cheeky little advertisements at the right time we
                    could probably get Tom to buy a wedding ring.
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
                    className={styles.button}
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
                Jewelry stores will be very grateful for these{" "}
                <span className={styles.highlight}>potential customers</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    Advertisers can combine data from multiple devices and different people to suggest ads to you, based
                    on their behaviour. Have you ever searched for something online, only to see an ad about that
                    specific product on your sibling’s screen? That’s all the algorithm.
                  </p>
                  <p>Let’s get back to what matters though, money... I mean Tom.</p>
                  <p>
                    Which store should we recommend to Tom? We don’t really care, just make sure we make some money.
                    We’ll sell his data to all of them anyways, but it’s up to you to decide who gets it first.
                  </p>
                </section>
                <button
                  onClick={() =>
                    handleMovement({
                      first: "#experience__10",
                      second: "#experience__11",
                      direction: "right",
                      path_inc_x: "3",
                      path_inc_y: "-4.8",
                    })
                  }
                  className={styles.button}
                >
                  Advertise Cartier
                </button>
              </section>
            </section>
            <section className={`${styles.experience__step} ${styles.experience__11}`} id="experience__11">
              <h2 className={styles.title}>
                I guess it's clear what we can do with <span className={styles.highlight}>your data</span>
              </h2>
              <section className={styles.experience__step_content}>
                <section className={styles.step__content_text}>
                  <p>
                    You can prevent the internet collecting, selling, using your data. Protect yourself against the
                    manipulation of the corporate world. If you want to see all data that is available to the internet
                    at this exact moment, take a look below.
                  </p>
                  <button className={styles.button}>Show me what you can track</button>
                  <button className={`${styles.button} ${styles.light}`}>give me tips!</button>
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
