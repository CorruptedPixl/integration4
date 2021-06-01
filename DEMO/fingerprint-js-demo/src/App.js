import logo from "./first_test.png";
import "./App.css";
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

function App() {
  const [visitorInfo, setVisitorInfo] = useState();
  const [responseSummary, setResponseSummary] = useState();
  const [serverData, setServerData] = useState();

  useEffect(() => {
    FingerprintJS.load({
      token: process.env.REACT_APP_FPJS_TOKEN,
      region: process.env.REACT_APP_FPJS_REGION,
      endpoint: "https://metrics.pxl.zone",
    })
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorInfo(result);
      });
  }, []);

  useEffect(() => {
    if (visitorInfo) {
      callServerAPI();
    }
  }, [visitorInfo]);

  const callServerAPI = () => {
    fetch(
      `https://eu.api.fpjs.io/visitors/${
        visitorInfo.visitorId
      }?limit=${1000}&token=${process.env.REACT_APP_FPJS_APIKEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.visits);
        setResponseSummary(`Received history of ${data.visits.length} visits`);
        setServerData(data);
        // data = JSON.stringify(data.visits, null, 4);
      });
  };

  visitorInfo && console.log(visitorInfo);
  serverData && console.log(serverData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Visitor id: {visitorInfo && visitorInfo.visitorId}</p>
        <p>{responseSummary}</p>
        <p>
          {serverData && serverData.visits[0].incognito
            ? "Using incognito"
            : "Not using incognito"}
        </p>
        <p>IP: {serverData && serverData.visits[0].ip}</p>
        <p>City: {serverData && serverData.visits[0].ipLocation.city.name}</p>
        <p>
          {serverData &&
            `Using ${serverData.visits[0].browserDetails.browserName}, version ${serverData.visits[0].browserDetails.browserFullVersion} on ${serverData.visits[0].browserDetails.os} ${serverData.visits[0].browserDetails.osVersion}`}
        </p>
      </header>
    </div>
  );
}

export default App;
