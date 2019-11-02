import React, { Component } from "react";
import styles from "./threeQuestion.module.css";
import cx from "classnames";

class QuestionsComponent extends Component {
  constructor() {
    super();

    this.state = {
      answerKeys: ["a", "b", "c"]
    };
  }

  render() {
    var questions = this.props.dataReceived.landerText.questions;
    var questionsIndex = Object.keys(questions);

    return questionsIndex.map(key => (
      <div className="test" key={key.toString()}>
        <div
          className={cx(
            styles.question,
            styles.question + Number(key) + Number(1),
            this.props.currentKey == key
              ? styles.alertShown
              : styles.alertHidden
          )}
        >
          <h2 className={styles.subtitle}>{questions[key].question}</h2>
          <div className={styles.question__answers}>
            {Object.keys(
              this.props.dataReceived.landerText.questions[key].answers
            ).map(item => (
              <div key={item}>
                <input
                  type="radio"
                  id={"question" + key + 1 + this.state.answerKeys[item]}
                  name={"question" + key + 1}
                />
                <label
                  htmlFor={"question" + key + 1 + this.state.answerKeys[item]}
                  onClick={this.props.ChangeCurrentKey}
                >
                  <span>{questions[key].answers[item].answer}</span>
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  }
}

export default QuestionsComponent;
