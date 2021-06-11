import io from "socket.io-client";
import styles from "../styles/Console.module.scss";
import { useState, useEffect } from "react";

const Console = () => {
  const [socket, setSocket] = useState();
  const [messageLog, setMessageLog] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001"); // Local socket.io server must be running on port 3001 for local testing
    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleEvent = (payload) => {
      console.log(payload);

      setMessageLog((currentArray) => [...currentArray, payload.toString()]);
    };
    if (socket) {
      socket.on("consoleMessage", handleEvent);
    }
  }, [socket]);

  const handleSubmitMessage = (message) => {
    message.preventDefault();
    console.log(message);
    if (currentInput) {
      socket.emit("consoleMessage", currentInput);
      setCurrentInput("");
    }
  };

  return (
    <>
      <section className={styles.container}>
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
          {messageLog
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
