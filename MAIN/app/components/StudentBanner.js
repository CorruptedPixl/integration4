import styles from "../styles/StudentBanner.module.scss";
import useLocalStorage from "../hooks/useLocalStorage";

const studentBanner = () => {
  const [bannerVisibility, setBannerVisibility] = useLocalStorage("bannerVisibility", true);

  return (
    <>
      {bannerVisibility ? (
        <div className={styles.container}>
          <span>
            This is a fictional project, a student assignment for the Bachelor's degree{" "}
            <a href="https://devine.be" className={styles.link}>
              Devine
            </a>
          </span>
          <button className={styles.button} onClick={() => setBannerVisibility(!bannerVisibility)}>
            x
          </button>
        </div>
      ) : null}
    </>
  );
};

export default studentBanner;
