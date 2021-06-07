import { animated } from "react-spring";

const ParallaxMouse = ({
  xFactor, // Optional: Defaults to 5
  yFactor, // Optional: Defaults to the same value as xFactor
  className, // Optional
  springProps, // Required
  globalFactor, // Required
  children, // Default prop
}) => {
  const transformFunc = (propsX, propsY) =>
    `translate3d(${propsX / xFactor / globalFactor}rem,${propsY / (yFactor || xFactor) / globalFactor}rem,0)`;

  return (
    <animated.div style={{ transform: springProps.xy.to(transformFunc) }} className={className}>
      {children /* Renders children (Images, Text, etc...)*/}
    </animated.div>
  );
};

ParallaxMouse.defaultProps = {
  xFactor: 5,
};

export default ParallaxMouse;
