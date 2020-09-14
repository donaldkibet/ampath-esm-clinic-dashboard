import React from "react";
import { Link } from "react-router-dom";
import styles from "./dashboard.component.css";
import routesJson from "./dashboard.routes.json";

const Home: React.FC = () => {
  return (
    <div className={styles["home-container"]}>
      {routesJson.map((routes) => (
        <Link to={routes.url} key={routes.name} className={styles["home-link"]}>
          <div className={styles["report-title-container"]}>
            <div className={`${styles["report-icon"]}`}>
              <svg className="omrs-icon">
                <use xlinkHref={`#${routes.icon}`}></use>
              </svg>
            </div>
            <div className={styles["report-title"]}>{routes.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
