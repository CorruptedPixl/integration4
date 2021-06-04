import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { Parallax } from "react-parallax"; // Scroll parallax
import { useSpring, animated } from "react-spring"; // Mouse parallax

// import landing from "/landing.png";

export default function Home() {
  const calc = (x, y) => [
    x - window.innerWidth / 2,
    y - window.innerHeight / 2,
  ];
  const trans1 = (x, y) => `translate3d(${x / 10 / 10}rem,${y / 10 / 10}rem,0)`;
  const trans2 = (x, y) => `translate3d(${x / 8 / 10}rem,${y / 8 / 10}rem,0)`;
  const trans3 = (x, y) => `translate3d(${x / 6 / 10}rem,${y / 6 / 10}rem,0)`;
  const trans4 = (x, y) =>
    `translate3d(${x / 3.5 / 10}rem,${y / 3.5 / 10}rem,0)`;

  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="desc" />
        <link rel="icon" href="/ctrl.logo.svg" />
      </Head>

      <main className={styles.main__container}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Parallax
          blur={10}
          bgImage="/laptop.png"
          bgImageAlt="the cat"
          strength={600}
        >
          <div // Is necessary for mouseMove event to fire.
            className={styles.parallaxContainer}
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xy: calc(x, y) })
            }
          >
            {/* This component MUST be in a container for the mouseMove event
              to fire. The Parallax scroll bg does not register it */}
            <animated.div style={{ transform: props.xy.to(trans1) }}>
              <Image
                class={styles.parallax__img}
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            Content goes here. Parallax height grows with content height.
            <animated.div style={{ transform: props.xy.to(trans2) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans3) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans4) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans1) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans2) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans3) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans4) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans2) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
            <animated.div style={{ transform: props.xy.to(trans3) }}>
              <Image
                src="/laptop.png"
                alt="laptop dude"
                width={640}
                height={496}
              />
            </animated.div>
          </div>
        </Parallax>

        <p className={styles.description}>
          Lopem ipsum or something I don't know the actual text but there's
          probably a dolor summet or something in it.
        </p>
      </main>
    </div>
  );
}
