import React, { Component } from "react";
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainOne extends Component {
  render() {
    var { stageOne, FirstBtnClick, dataReceived } = this.props;
    var text = dataReceived.landerText;

    return (
      <div>
        <main
          className={cx(
            styles.main,
            styles.main - 1,
            stageOne ? styles.alertShown : styles.alertHidden
          )}
        >
          <div className={styles.card}>
            <h2 className={styles.title}>{text.popUpH3Text}</h2>
            <span className={cx(styles.badge, styles.dataBadge)}>
              <img
                src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/icon-box.svg"
                alt=""
              />
            </span>
            <p>
              <br />
              {text.popUpP1Text}
            </p>
            <hr />
            <dl className={styles.trackingCode}>
              <dt> {text.popUpP2Text}:</dt>
              <dd style={{ color: "red" }}>Iph022QXw</dd>
            </dl>
          </div>
          <button
            type="button"
            className={cx(styles.btn, styles.screenTrigger1)}
            onClick={FirstBtnClick}
          >
            {text.popUpP3Text}
          </button>
        </main>
      </div>
    );
  }
}

export default MainOne;
