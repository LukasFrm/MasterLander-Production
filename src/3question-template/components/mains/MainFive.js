import React, { Component } from 'react'
import styles from "../../components/threeQuestion.module.css";
import cx from "classnames";

class MainFive extends Component {


  render() {
    var {stageFive, stageSix} = this.props
    
    return (
        
      <main className={cx(styles.main, styles.main5, (stageFive ? styles.alertShown : styles.alertHidden), (stageSix ? styles.checked : ''))}>


      
        <ol className={styles.stepsWrap}>
          <li className={cx(styles.step, styles.stepCurrent)}/>
          <li className={cx(styles.step, styles.stepCurrent)}/>
          <li className={cx(styles.step, styles.stepCurrent)}/>
        </ol>
        <div className={styles.card}>
          <div
            className={cx(styles.spinner, (stageSix ? 'd-none' : 'd-block'))}
          />
          <img
            className={cx(styles.main__icon, styles.icon, styles.iconCheck)}
            src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/check-circle-regular.png"
            alt = 'Circle Check'
          />
        </div>
      </main>
    )
  }
}

export default MainFive
