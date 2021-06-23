import io from "socket.io-client";
import styles from "../styles/Console.module.scss";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Console = ({ socket, setSocket }) => {
  const [messageLog, setMessageLog] = useLocalStorage("messageLog", []);
  const [currentInput, setCurrentInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001"); // Local socket.io server must be running on port 3001 for local testing
    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  const updateMessageLog = (newArray) => {
    setMessageLog(newArray);
  };

  useEffect(() => {
    const handleEvent = (message) => {
      // So, memory leaks eh?
      // Don't you love it when the project is done, and you're doing user tests,
      // and suddenly users start complaining about the site 'crashing their browsers',
      // 'crashing extensions'... They're the user, so it must be their fault you think...
      // Until you visit it yourself and woah look at that! 10GB RAM usage!
      // panic.mp4 ensues.
      // What could be causing this!? Well, in short, socket.io events. The long explaination is that callbacks grew exponentially on each message received, but the thing is, we fixed it.
      // In case you ever have a memory leak in react, and you're using either socket.io or useEffect, make sure that you CLEAN UP.
      updateMessageLog((currentArray) => [...currentArray, message.toString()]);
    };

    if (socket) {
      socket.on("consoleMessage", handleEvent);
    }

    // Added cleanup for socket.io events
    return () => {
      // I ain't taking chances with socket.off, so we're removing ALL OF THEM
      if (socket) socket.removeAllListeners("consoleMessage");
    };
  }, [socket, messageLog]);

  useEffect(() => {
    // Add eventlistener for '/ or :' key to show/hide console
    const handleKeydown = (event) => {
      const { keyCode } = event;

      if (keyCode === 191) {
        setIsVisible(!isVisible);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isVisible]);

  const handleSubmitMessage = (message) => {
    message.preventDefault();
    if (currentInput) {
      socket.emit("consoleMessage", currentInput);
      setCurrentInput("");
    }
  };

  const clearConsole = () => {
    setMessageLog([]);
  };

  return (
    <>
      <section className={isVisible ? `${styles.container}` : `${styles.container} ${styles.visuallyHidden}`}>
        <h2 className={styles.hidden}>Console</h2>
        <p>
          Press <code className={styles.code}>/</code> again to close the console.
        </p>
        <button className={styles.button} onClick={clearConsole}>
          Clear console
        </button>
        <form className={styles.commandInput} action="/" onSubmit={(e) => handleSubmitMessage(e)}>
          <input
            className={styles.inputField}
            autoComplete="off"
            value={currentInput}
            onChange={(input) => setCurrentInput(input.target.value)}
          />
          <input className={styles.submitBtn} type="submit" value="Send" />
        </form>
        <ul id="messages">
          {messageLog &&
            messageLog
              .slice(0)
              .reverse()
              .map((message, index) => (
                <li className={styles.message} key={index}>
                  {message}
                </li>
              ))}
        </ul>
      </section>
    </>
  );
};

export default Console;
