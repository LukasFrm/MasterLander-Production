import React, { Component } from "react";
import styles from "./threeQuestion.module.css";

class Footer extends Component {
  render() {
    return (
      <div className={styles.foot}>
        <h4 className={styles.foot__title}>Developed by:</h4>
        <div className={styles.foot__icons}>
          <img
            src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/foot-icon01.svg"
            alt=""
          />
          <img
            src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/foot-icon02.svg"
            alt=""
          />
          <img
            src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/foot-icon03.svg"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Footer;
