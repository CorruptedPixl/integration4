import styles from "../styles/Toggle.module.scss";

const Toggle = ({ className, valueLeft, valueRight, toggleState, setToggleState }) => {
  const handleToggleState = () => {
    setToggleState(toggleState === valueLeft ? valueRight : valueLeft);
  };

  return (
    <>
      <div className={`${styles.container} ${className}`} onClick={() => handleToggleState()}>
        <div className={toggleState === valueRight ? `${styles.button}` : `${styles.button} ${styles.button__active}`}>
          {valueLeft}
        </div>
        <div className={toggleState === valueRight ? `${styles.button} ${styles.button__active}` : `${styles.button}`}>
          {valueRight}
        </div>
      </div>
    </>
  );
};

export default Toggle;
