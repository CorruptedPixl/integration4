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

  useEffect(() => {
    const handleEvent = (message) => {
      // Add messages to the messageLog
      setMessageLog((currentArray) => [...currentArray, message.toString()]);
    };
    if (socket) {
      socket.on("consoleMessage", handleEvent);
    }
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
        <p>
          Press <code className={styles.code}>/</code> again to close the console.
        </p>
        <button onClick={clearConsole}>Clear console</button>
        <form className={styles.commandInput} action="" onSubmit={(e) => handleSubmitMessage(e)}>
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
