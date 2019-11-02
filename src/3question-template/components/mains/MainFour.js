import React, { Component } from 'react'
import QuestionsComponent from '../QuestionsComponent'
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainFour extends Component {
  render() {
    var {stageFour, dataReceived, isFetched, currentKey, ChangeCurrentKey } = this.props
    var offer = dataReceived.offerwallItems[0].offer.item

    return (

      <main className={cx(styles.main, styles.main4, (stageFour ? styles.alertShown : styles.alertHidden))}>

        <ol className={styles.stepsWrap}>
          <li className={cx(styles.step, styles.step, styles.stepDone)} />
          <li className={cx(styles.step, styles.stepCurrent)} />
          <li className={styles.step} />
        </ol>
        <div className={styles.card}>
          <img
            src={
                offer
                .pictureUrl
            }
            alt=""
            style={{ maxWidth: "30%" }}
            className={styles.offerPic}
          />
          <form className={styles.questionsWrap}>
            <QuestionsComponent
              dataReceived={dataReceived}
              isFetched={isFetched}
              currentKey={currentKey}
              ChangeCurrentKey={ChangeCurrentKey}
            />
          </form>
        </div>
      </main>
    )
  }
}

export default MainFour
