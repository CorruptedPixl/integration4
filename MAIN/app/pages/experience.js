import styles from "../styles/Experience.module.scss";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import ParallaxMouse from "../components/ParallaxMouse";

const experience = () => {
  return (
    <>
      <main className={styles.main__container}>
        <section className={styles.main__container_intro}>
          <h1 className={styles.title}>Welcome ... are you ready to become Big Brother?</h1>
          <p className={styles.container__intro_text}>
            Let’s take a dive into the algorithm and get to know Sam from the data that’s being tracked. Your name will
            be used to personalize this webpage locally and will not be sent to our servers.
          </p>
          <button className={`${styles.button} ${styles.container__intro_button}`}>Start the experience</button>
          <small className={styles.container__intro_disclaimer}>By continuing you accept the necessary cookies to make this experience work</small>
          <Image src="/experience/sound_on.svg" width="56px" height="51px"></Image>
          <small className={styles.container__intro_info}>For the ultimate experience please use sound and disable your add-blocker</small>
        </section>
        <section>
          <h1 className={styles.title}>
            You are right on time, Noa. Sam just accepted <span className={styles.highlight}>cookies</span> again.
          </h1>
          <section>
            <section>
              <p>
                It’s amazing... Sam just blindly accepted cookies on a website. Looks like we’re gonna get some
                interesting data to go through.
              </p>
              <p>
                Maybe you don’t know who Sam is but by the end of this you will know more about him than you could ever
                image. Let’s get to know him!
              </p>
              <button>Start tracking Sam</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            But first, how do we track Sam? One word: <span className={styles.highlight}>Fingerprints.</span>
          </h1>
          <section>
            <section>
              <p>
                Cookies alone don’t track you, actually, most of them are used for legitemate purposes such as keeping
                you logged in, making sure you have access to certain files, and to remember what items you had in your
                cart so they don’t dissapear on each refresh.
              </p>
              <p>
                “Then why are cookies bad??” I can hear you asking... Well advertisers use cookies to store a unique
                identifier, also called a fingerprint in that cookie. They get sent along with each request, so they
                know who you are before you even see the first words appear on the page.
              </p>
              <p>Tom’s browser fingerprint is (fpjs fingerprint of user)</p>
              <button>Look at what he's doing</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            Since he <span>gave acces</span> we can track... pretty much everything.
          </h1>
          <section>
            {/*<Image></Image>*/}
            <section>
              <p>
                Tom accepted all cookies, that means first part cookies (usually necessary to make the website work) but
                also third party one’s that — you guessed it — gather info to track Tom.
              </p>
              <p>
                Well maybe we should take a peek at what he’s doing, it might come in handy when we want to send him
                some advertisements...
              </p>
              <button>What does this do?</button>
              <button>Let's unlock some data</button>
            </section>
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            Well yeah that's right <span className={styles.highlight}>every move</span> you make gets stored in a
            profile.
          </h1>
          <section>
            <section>
              <p>
                The internet doesn’t just look at what you’re doing. It stores all your preferences, interests, ... in
                your personal profile. That way it’s ready for the next time we need to throw you some ads.
              </p>
              <button>Generate his profile</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            Done!
            <br />
            Well I guess you can <span>see what he's doing.</span>
          </h1>
          <section>
            {/*<Image></Image>*/}
            <section>
              <p>Now that we got his data and created a profile, let’s serve him some ads!</p>
              <p>
                You can choose what advertisements we should send him. Keep in mind what he’s looking at to give him the
                best ads.
              </p>
              <button>Advertise ...</button>
            </section>
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            Nice, <span className={styles.highlight}>your ad worked</span>, we got him to look at (choice) related
            products!
          </h1>
          <section>
            <section>
              <p>
                Isn’t that awesome? he’s browsing the cat products we wanted him to look at. We should store his
                interest in cat products to his personal profile.
              </p>
              <p>
                This is how we do it with everyone, we watch from a distance, collect everything we can find about them,
                build their profile and recommend advertisements based one that.
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
              <button>Skip add</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            We see Sam <span className={styles.highlight}>lives near Bruges</span> based on his{" "}
            <span className={styles.highlight}>IP</span> and it's almost dinner time.
          </h1>
          <section>
            <section>
              <p>
                I know he lives near bruges because of his IP address, it’s pretty easy. I also know that you live in
                (CITY). That might come in handy in the future but hey... don’t worry about it.
              </p>
              <p>
                In the meantime let’s choose something for him to eat. We know he likes pizza based on his profile, but
                what do you think he should be offered tonight?
              </p>
              <button>Advertise Pizza.be</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            We know Sam has a partner due to his <span className={styles.highlight}>shared IP</span> and
            <span className={styles.highlight}>GPS location.</span>
          </h1>
          <section>
            <section>
              <p>
                According to his GPS data (and ‘anonymous’ data from others) Tom’s usually near one single person when
                he’s at home. Combining this with their facebook relation status, we can figure out they are in a
                relationship.
              </p>
              <p>Maybe we can help them to take the next step, and make some money doing it?</p>
              <button>Let's help them!</button>
              <button>Naaaaaah...</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            His partner has been looking at <span className={styles.highlight}>wedding rings</span>
          </h1>
          <section>
            <section>
              <p>
                Ain’t this a handy piece of information? With some cheeky little advertisements at the right time we
                could probably get Tom to buy a wedding ring.
              </p>
              <p>
                Wouldn’t that be beautiful?
                <br />
                That was a rhetorical question, we don’t care about that, we only care about money.
              </p>
              <button>Let's make some bank</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            Jewelry stores will be very grateful for these <span className={styles.highlight}>potential customers</span>
          </h1>
          <section>
            <section>
              <p>
                Advertisers can combine data from multiple devices and different people to suggest ads to you, based on
                their behaviour. Have you ever searched for something online, only to see an ad about that specific
                product on your sibling’s screen? That’s all the algorithm.
              </p>
              <p>Let’s get back to what matters though, money... I mean Tom.</p>
              <p>
                Which store should we recommend to Tom? We don’t really care, just make sure we make some money. We’ll
                sell his data to all of them anyways, but it’s up to you to decide who gets it first.
              </p>
            </section>
            <button>Advertise Cartier</button>
          </section>
        </section>
        <section>
          <h1 className={styles.title}>
            I guess it's clear what we can do with <span className={styles.highlight}>your data</span>
          </h1>
          <section>
            <section>
              <p>
                You can prevent the internet collecting, selling, using your data. Protect yourself against the
                manipulation of the corporate world. If you want to see all data that is available to the internet at
                this exact moment, take a look below.
              </p>
              <button>Show me what you can track</button>
              <button>give me tips!</button>
            </section>
            {/*<Image></Image>*/}
          </section>
        </section>
      </main>
    </>
  );
};

export default experience;
