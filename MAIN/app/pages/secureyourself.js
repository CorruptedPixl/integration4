import styles from "../styles/Secureyourself.module.scss";
import Image from "next/image";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring } from "react-spring"; // Mouse parallax
import { useState } from "react";
import ThreejsObjects from "../components/ThreejsObjects.js";
import ParallaxMouse from "../components/ParallaxMouse";

export default function secureyourself() {
  return (
    <>
      <main className={styles.main__container}>
        <section>
          <h1>Let's grab some cookies and talk about it</h1>
          <p>
            Before we give you tips on what you can do to <b>prevent</b> data tracking we want to tell you that{" "}
            <b>not all cookies are bad</b> and most of them are created to give you a better experience.
          </p>
          <section>
            <h2>But who doesn't like a cookie?</h2>
            <p>
              There are some cookies that <b>take advantage</b> of your data and that's what we want to protect.
            </p>
            <p>
              That's why you should always <b>be careful</b> accepting things left, right and center.
            </p>
            <p>Below we've listed some tips that can help keep your data safe!</p>
          </section>
        </section>
        <section>
          <h1>Some tips that can help you right now!</h1>
          <p>
            We've listed some things that will prevent most data tracking. It's a great step towards safer browsing
            through the internet!
          </p>
          <ul>
            <li>
              <h2>Use adblocker</h2>
              <Image src="/ctrl.logo.svg" width={200} height={50}></Image>
              <p>Install an adblocker, this will prevent data tracking.</p>
            </li>
            <li>
              <h2>Don't accept all cookies</h2>
              <Image src="/ctrl.logo.svg" width={200} height={50}></Image>
              <p>Only accept necessary cookies.</p>
            </li>
            <li>
              <h2>Use incognito</h2>
              <Image src="/ctrl.logo.svg" width={200} height={50}></Image>
              <p>Use incognito if you don't want any cookies, those cookies get deleted when you close the tab.</p>
            </li>
          </ul>
        </section>
        <section>
          <section>
            <h1>Let's find out what we know about you!</h1>
            <p>
              It’s common sense that we like our privacy isn’t it? Sometimes it feels like google knows what we really
              want. isn’t that a bit scary?
            </p>
            <p>
              If you want to know the things we’ve tracked about you, you can track all your data right now. You can
              also see what’s happening right now by pressing F1 and find some dark secrets.
            </p>
            <button>Scan my data now</button>
          </section>
          <Image src="/trackme.png" width={500} height={500}></Image>
        </section>
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
      </footer>
    </>
  );
}
