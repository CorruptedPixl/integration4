import styles from "../styles/Toggle.module.scss";

const Toggle = ({ className, valueLeft, valueRight, toggleState, setToggleState }) => {
  return (
    <>
      <div className={`${styles.container} ${className}`} onClick={() => setToggleState(!toggleState)}>
        <div className={toggleState ? `${styles.button}` : `${styles.button} ${styles.button__active}`}>
          {valueLeft}
        </div>
        <div className={toggleState ? `${styles.button} ${styles.button__active}` : `${styles.button}`}>
          {valueRight}
        </div>
      </div>
    </>
  );
};

export default Toggle;
