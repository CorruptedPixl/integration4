import { useEffect, useState } from "react";
import styles from "../styles/Scanner.module.scss";
import translations from "../translations/scanner.json";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

const Scanner = ({ visible, setVisitorData, currentLang }) => {
  const [visitorInfo, setVisitorInfo] = useState();
  const [responseSummary, setResponseSummary] = useState();
  const [serverData, setServerData] = useState();
  const [lastVisit, setLastVisit] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [showAllVisits, setShowAllVisits] = useState(false);

  useEffect(() => {
    // Get the fingerprint
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
    // Get the user's past visits and data from fpjs servers
    fetch(
      `https://metrics.pxl.zone/visitors/${visitorInfo.visitorId}?limit=${100}&token=${
        process.env.NEXT_PUBLIC_FPJS_APIKEY
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponseSummary(
          <p>
            {translations.summary.visited[currentLang]}{" "}
            <code className={styles.code}>{data.visits.length >= 100 ? "100+" : data.visits.length}</code>{" "}
            {translations.summary.times[currentLang]}
          </p>
        );
        setServerData(data);
        console.log(data);
        setLastVisit(data.visits[0]);
      });
  };

  useEffect(() => {
    if (lastVisit) {
      callWeatherAPI();
    }
  }, [lastVisit]);

  const callWeatherAPI = () => {
    // Get the user's past visits and data from fpjs servers
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lastVisit.ipLocation.latitude}&lon=${lastVisit.ipLocation.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  };

  const getWeatherTempFeeling = () => {
    const temp = weatherData.main.temp;
    switch (true) {
      case temp >= 30:
        return translations.story.weather_burning[currentLang];
        break;
      case temp >= 20:
        return translations.story.weather_hot[currentLang];
        break;
      case temp >= 15:
        return translations.story.weather_avg[currentLang];
        break;
      case temp >= 10:
        return translations.story.weather_chilly[currentLang];
        break;
      case temp < 10:
        return translations.story.weather_cold[currentLang];
        break;
      case temp <= 0:
        return translations.story.weather_freezing[currentLang];
        break;

      default:
        break;
    }
  };

  // Send back data to parent component if asked for it
  if (serverData && setVisitorData != false) setVisitorData(serverData);

  return (
    <section className={visible ? styles.container : `${styles.container} ${styles.visuallyHidden}`}>
      {serverData && lastVisit ? (
        <>
          {/* Would've used <Suspense/> but react dom doesn't support that right now, so we're doing it the old school way */}
          <h3 className={styles.subtitle}>{translations.story.subtitle[currentLang]}</h3>

          <p>
            {translations.story.p1[currentLang]}{" "}
            {/* Error handling is present in case either fpjs can't find the location or the weather api fails*/}
            {weatherData
              ? translations.story.p1_weather_available[currentLang]
              : translations.story.p1_weather_unavailable[currentLang]}{" "}
            {weatherData && `${getWeatherTempFeeling()} ${translations.story.currently[currentLang]} `}
            {weatherData && (
              <code className={styles.code}>{weatherData && Math.round(weatherData.main.temp)}°C</code>
            )}{" "}
            {translations.story.down[currentLang]} {weatherData ? weatherData.name : lastVisit.ipLocation.city.name}
          </p>
          <p>{translations.story.live[currentLang]}</p>
          {weatherData && (
            <p>
              {translations.story.coords[currentLang]}{" "}
              <code className={styles.code}>Lat:{weatherData && weatherData.coord.lat}</code>{" "}
              <code className={styles.code}>Long:{weatherData && weatherData.coord.lon}</code>
            </p>
          )}
          <br />

          <p>
            {translations.story.id_you[currentLang]}
            <em className={styles.emphasized}> {translations.story.id_unique[currentLang]} </em>
            {translations.story.id_id[currentLang]}{" "}
            <code className={styles.code}>{visitorInfo && visitorInfo.visitorId}</code>
          </p>
          <p>
            {translations.story.ip_about[currentLang]} <code className={styles.code}>{serverData && lastVisit.ip}</code>{" "}
            {translations.story.ip_about2[currentLang]}
          </p>
          {lastVisit.ipLocation.city.name && lastVisit.ipLocation.postalCode && lastVisit.ipLocation.country.name ? (
            <>
              <p>
                {translations.story.ip_address[currentLang]}{" "}
                <code className={styles.code}>
                  {lastVisit.ipLocation.city.name}, {lastVisit.ipLocation.postalCode},{" "}
                  {lastVisit.ipLocation.country.name}
                </code>{" "}
              </p>
            </>
          ) : (
            <code className={styles.code}>
              Hmm, we can't seem to find your location based on your IP address right now. Good job! In case this is an
              error, our apologies.
            </code>
          )}
          <br />

          <p>
            {translations.story.browser_using[currentLang]} {lastVisit.browserDetails.browserName}
            {translations.story.browser_v[currentLang]}{" "}
            <code className={styles.code}>{lastVisit.browserDetails.browserFullVersion}</code>{" "}
            {translations.story.browser_on[currentLang]}{" "}
            <code className={styles.code}>
              {lastVisit.browserDetails.os} {lastVisit.browserDetails.osVersion}
            </code>
            {", "}
            {serverData && lastVisit.incognito
              ? translations.story.incog_true[currentLang]
              : translations.story.incog_false[currentLang]}
          </p>
          <p>
            {translations.story.robot[currentLang]}{" "}
            <code className={styles.code}>{lastVisit.browserDetails.botProbability * 100} %</code>
          </p>

          {responseSummary}
          <p>{translations.story.visits_list[currentLang]}</p>
          <ul className={styles.visit__list}>
            {showAllVisits
              ? serverData.visits.map((visit, index) => {
                  const visitTime = new Date(visit.timestamp);
                  return (
                    <li key={index}>
                      {visitTime.getDate() === new Date().getDate()
                        ? translations.story.visits_today[currentLang]
                        : `${visitTime.getFullYear()}/${visitTime.getMonth()}/${visitTime.getDate()}`}{" "}
                      {visitTime.getHours()}:{visitTime.getMinutes()}{" "}
                      {visit.ipLocation.city.name && `from ${visit.ipLocation.city.name}`}
                    </li>
                  );
                })
              : serverData.visits.slice(0, 5).map((visit, index) => {
                  const visitTime = new Date(visit.timestamp);
                  return (
                    <li key={index}>
                      {visitTime.getDate() === new Date().getDate()
                        ? translations.story.visits_today[currentLang]
                        : `${visitTime.getFullYear()}/${visitTime.getMonth()}/${visitTime.getDate()}`}{" "}
                      {visitTime.getHours()}:{visitTime.getMinutes()}{" "}
                      {visit.ipLocation.city.name && `from ${visit.ipLocation.city.name}`}
                    </li>
                  );
                })}
          </ul>
          <a className={styles.visitsButton} onClick={() => setShowAllVisits(!showAllVisits)}>
            {showAllVisits
              ? translations.story.visits_btn_hide[currentLang]
              : translations.story.visits_btn[currentLang]}
          </a>
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

Scanner.defaultProps = {
  // When the component is loaded, should it be visible?
  visible: true,
  // Set this from parent element of you want to pull the data out of the scanner
  setVisitorData: false,
};

export default Scanner;
