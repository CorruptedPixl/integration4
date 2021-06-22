import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import Toggle from "../components/Toggle";

const Navbar = ({ children }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__list_logo}>
          <a href="/">
            <Image src="/ctrl.logo.svg" width={200} height={50}></Image>
          </a>
        </li>
        <ul className={styles.navbar__list_interactions}>
          <li className={styles.list__interactions_link}>
            <a href="/secureyourself">secure yourself</a>
          </li>
          <li className={styles.list__interactions_link}>
            <a href="experience">follow Sam</a>
          </li>
          <li className={styles.list__interactions_toggle}>{children}</li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;
