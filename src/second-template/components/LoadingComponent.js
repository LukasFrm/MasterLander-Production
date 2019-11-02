import React, { Component } from "react";
import styles from "../secondLander.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "react-fade-in";

class LoadingComponent extends Component {
  render() {
    var { dataReceived, check1, check2, check3 } = this.props;
    var checkers = dataReceived.text.websiteTitleText.split(",");
    return (
      <div className={styles.maincnt}>
        <h1>{dataReceived.text.questionsHeaderText}</h1>
        <img
          src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/loading.gif"
          className={styles.loader}
          alt="Loading"
        ></img>
        <b>
          {check1 ? (
            <FadeIn>
              <p>
                <FontAwesomeIcon icon={faCheckSquare} /> {checkers[0]}
              </p>{" "}
            </FadeIn>
          ) : null}
          <br />
          {check2 ? (
            <FadeIn>
              <p>
                <FontAwesomeIcon icon={faCheckSquare} /> {checkers[1]}
              </p>{" "}
            </FadeIn>
          ) : null}
          <br />{" "}
          {check3 ? (
            <FadeIn>
              <p>
                <FontAwesomeIcon icon={faCheckSquare} /> {checkers[2]}
              </p>{" "}
            </FadeIn>
          ) : null}
        </b>
      </div>
    );
  }
}

export default LoadingComponent;
