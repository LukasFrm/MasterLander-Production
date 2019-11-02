import React, { Component } from "react";
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainThree extends Component {
  render() {
    var { stageThree, SecondBtnClick, dataReceived } = this.props;
    var text = dataReceived.landerText;
    var offer = dataReceived.offerwallItems[0].offer.item;

    return (
      
      <main className={cx(styles.main, styles.main3, (stageThree ? styles.alertShown : styles.alertHidden))}>
        <ol className={styles.stepsWrap}>
          <li className={cx(styles.step, styles.stepCurrent)} />
          <li className={styles.step} />
          <li className={styles.step} />
        </ol>
        <div className={styles.card}>
          <div className={styles.product}>
            <img src={offer.pictureUrl} className={styles.offerPic} alt=""  style={{ maxWidth: "30%" }} />
            <div className={styles.product__content}>
              <h3 className={styles.subtitle}>{text.websiteP2Text}:</h3>
              <dl className={styles.product__info}>
                <dt>{text.questionsHeaderText}:</dt>
                <dd>{text.checkingProductText}</dd>
              </dl>
              <dl className={styles.product__info}>
                <dt>{text.submittingText}:</dt>
                <dd>{text.orderQuantityLeftText}</dd>
              </dl>
              <dl className={styles.product__info}>
                <dt>{text.completedSurveyH4Text}:</dt>
                <dd>{offer.name}</dd>
              </dl>
              <dl className={styles.product__info}>
                <dt>{text.completedSurveyP1Text}:</dt>
                <dd>
                  {dataReceived.locale.currencyTag}
                  {
                    dataReceived.offerwallItems[0].offer
                      .shippingPrice
                  }
                </dd>
              </dl>
            </div>
          </div>
        <button
          type = 'button'
          className={cx(styles.btn, styles.screenTrigger2)}
          onClick={SecondBtnClick}
        >
          {text.completedSurveyP2Text}
        </button>
        </div>
      </main>
    );
  }
}

export default MainThree;
