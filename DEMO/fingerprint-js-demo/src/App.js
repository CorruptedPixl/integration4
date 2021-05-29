import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

function App() {
  const [visitorInfo, setVisitorInfo] = useState();

  useEffect(() => {
    FingerprintJS.load({
      token: process.env.REACT_APP_FPJS_TOKEN,
      region: process.env.REACT_APP_FPJS_REGION,
    })
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorInfo(result);
      });
  }, []);

  visitorInfo && console.log(visitorInfo);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Visitor id: {visitorInfo && visitorInfo.visitorId}</p>
      </header>
    </div>
  );
}

export default App;
