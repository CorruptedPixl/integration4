import styles from "../styles/Scanner.module.scss";
import { Suspense, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

const Scanner = () => {
  const [visitorInfo, setVisitorInfo] = useState();
  const [responseSummary, setResponseSummary] = useState();
  const [serverData, setServerData] = useState();

  useEffect(() => {
    FingerprintJS.load({
      token: process.env.NEXT_PUBLIC_FPJS_TOKEN,
      region: process.env.NEXT_PUBLIC_FPJS_REGION,
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
      `https://metrics.pxl.zone/visitors/${visitorInfo.visitorId}?limit=${1000}&token=${
        process.env.NEXT_PUBLIC_FPJS_APIKEY
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.visits);
        setResponseSummary(
          data.visits.length >= 100 ? (
            `You've visited this site <code className=${styles.code}>100+</code> times already.`
          ) : (
            <p>
              You've visited this site <code className={styles.code}>{data.visits.length}</code> times already.
            </p>
          )
        );
        setServerData(data);
      });
  };

  visitorInfo && console.log(visitorInfo);
  serverData && console.log(serverData);

  return (
    <section className={styles.container}>
      {serverData ? (
        <>
          <h3 className={styles.subtitle}>Right now, this is what we can track about you</h3>
          <p>
            You <em className={styles.emphasized}>unique</em> visitor id is:{" "}
            <code className={styles.code}>{visitorInfo && visitorInfo.visitorId}</code>
          </p>
          <p>
            You're using {serverData.visits[0].browserDetails.browserName}, version{" "}
            <code className={styles.code}>{serverData.visits[0].browserDetails.browserFullVersion}</code> on{" "}
            <code className={styles.code}>
              {serverData.visits[0].browserDetails.os} {serverData.visits[0].browserDetails.osVersion}.
            </code>
          </p>
          <p>
            The probability that you're a robot is{" "}
            <code className={styles.code}>{serverData.visits[0].browserDetails.botProbability * 100} %</code>
          </p>
          {responseSummary}
          <p>
            {serverData && serverData.visits[0].incognito
              ? "You're using incognito right now (try without!)"
              : "You're not using incognito right now (try it out!)"}
          </p>
          <p>
            Your IP address is <code className={styles.code}>{serverData && serverData.visits[0].ip}</code>
          </p>
          <p>
            Based on your IP, you're probably in or close to{" "}
            <code className={styles.code}>
              {serverData.visits[0].ipLocation.city.name}, {serverData.visits[0].ipLocation.postalCode},{" "}
              {serverData.visits[0].ipLocation.country.name}
            </code>{" "}
            right now.
          </p>
          {/*weather api, mcdonalds*/}
          <p>Feel free to copy and paste that next time you need to fill in your address online 😉</p>

          <p>Below you can see a list of the exact time you visited this site</p>
          <ul className={styles.visit__list}>
            {serverData.visits.map((visit, index) => {
              const visitTime = new Date(visit.timestamp);
              return (
                <li key={index}>
                  {visitTime.getDate() === new Date().getDate()
                    ? "Today, at "
                    : `${visitTime.getFullYear()}/${visitTime.getMonth()}/${visitTime.getDate()}`}{" "}
                  {visitTime.getHours()}:{visitTime.getMinutes()}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <p className={styles.subtitle}>Scanning...</p>
          <p>Please make sure your adblocker is disabled</p>
        </>
      )}
    </section>
  );
};

export default Scanner;
