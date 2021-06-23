import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import Toggle from "../components/Toggle";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("");

  const handleMobile = () => {
    if (navOpen) {
      setNavOpen(false);
      setActive("");
    } else {
      setNavOpen(true);
      setActive(styles.active);
    }
  };

  return (
    <nav className={`${styles.navbar} ${active}`}>
      {!active ? (
        <ul className={styles.navbar__list}>
          <li className={styles.navbar__list_logo}>
            <a href="/">
              <Image src="/ctrl.logo.svg" alt="ctrl. logo" width={100} height={50} priority={true}></Image>
            </a>
          </li>
          <li>
            <ul className={`${styles.navbar__list_interactions} ${active}`}>
              <li className={styles.list__interactions_link}>
                <a href="/secureyourself">secure yourself</a>
              </li>
              <li className={styles.list__interactions_link}>
                <a href="experience">follow Sam</a>
              </li>
              <li className={styles.list__interactions_toggle}>{children}</li>
            </ul>
          </li>
          <li onClick={() => handleMobile()} className={styles.navbar__list_hamburger}>
            {!navOpen ? (
              <Image
                src="/images/navbar/hamburger.svg"
                alt="hamburger menu icon"
                height={40}
                width={60}
                priority={true}
              ></Image>
            ) : (
              <Image
                src="/images/navbar/cross.svg"
                alt="cross to close hamburger menu"
                height={50}
                width={50}
                priority={true}
              ></Image>
            )}
          </li>
        </ul>
      ) : (
        <ul className={`${styles.navbar__list} ${styles.active}`}>
          <li className={styles.navbar__top_mobile}>
            <ul className={styles.navbar__list_top}>
              <li className={styles.navbar__list_logo}>
                <a href="/">
                  <Image src="/ctrl.logo.svg" width={100} height={50} priority={true}></Image>
                </a>
              </li>
              <li onClick={() => handleMobile()} className={styles.navbar__list_hamburger}>
                {!navOpen ? (
                  <Image src="/images/navbar/hamburger.svg" height={40} width={60} priority={true}></Image>
                ) : (
                  <Image src="/images/navbar/cross.svg" height={50} width={50} priority={true}></Image>
                )}
              </li>
            </ul>
          </li>
          <li>
            <ul className={`${styles.navbar__list_interactions} ${active}`}>
              <li className={styles.list__interactions_link}>
                <a href="/secureyourself">secure yourself</a>
              </li>
              <li className={styles.list__interactions_link}>
                <a href="experience">follow Sam</a>
              </li>
              <li className={styles.list__interactions_toggle}>{children}</li>
            </ul>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
