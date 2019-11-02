import React, { Component } from "react";
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainTwo extends Component {
  render() {
    var { stageTwo, dataReceived } = this.props;
    var text = dataReceived.landerText;

    return (
      <main
        className={cx(
          styles.main,
          styles.main - 2,
          stageTwo ? styles.alertShown : styles.alertHidden
        )}
      >
        <div className={styles.card}>
          <div className={styles.spinner} />
          <img
            className={cx(styles.main__icon, styles.icon, styles.iconCheck)}
            src="3question/Seguimiento y ubicación_files/check-circle-regular.png"
            alt="Check Circle"
          />
          <ul className={styles.loadingList}>
            <li>{text.surveyHeaderText}</li>
            <li>{text.surveyH4Text}</li>
            <li>{text.websiteP1Text}</li>
          </ul>
        </div>
      </main>
    );
  }
}

export default MainTwo;
