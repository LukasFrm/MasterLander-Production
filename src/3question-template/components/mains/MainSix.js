import React, { Component } from 'react'
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainSix extends Component {
  render() {

    var { stageSeven, dataReceived } = this.props;
    var text = dataReceived.landerText;
    var offer = dataReceived.offerwallItems[0].offer;


    return (

      <main className={cx(styles.main, styles.main6, (stageSeven ? styles.alertShown : styles.alertHidden))}>

        <ol className={styles.stepsWrap}>
          <li className={cx(styles.step, styles.stepCurrent)} />
          <li className={cx(styles.step, styles.stepCurrent)} />
          <li className={cx(styles.step, styles.stepCurrent)} />
              </ol>
        <div className={styles.card}>
          <h2 className={cx(styles.title, styles.titlePrimary)}>
            {text.leaveCommentText} #21410
          </h2>
          <img
            src={
              offer.item
                .pictureUrl
            }
            alt=""
            className={styles.offerPic}
            style={{ maxWidth: "30%" }}
          />
          <h3 className={styles.subtitle}>
            {text.commentButtonText}: <br />
            {text.thankYouText}{" "}
            {text.orderQuantityLeftText}
          </h3>
          <p>{text.antiSpamText}</p>
        </div>
        <a
          href={
            offer.offerUrl.url +
            1
          }
          target="blank_"
          className={styles.btn}
        //   style={{ backgroundColor: "red" }}
        >
          {text.ClickOkText}
        </a>
      </main>
    )
  }
}

export default MainSix
