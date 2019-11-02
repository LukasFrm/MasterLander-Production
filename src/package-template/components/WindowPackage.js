import React, { Component } from "react";
import cx from "classnames";
import styles from "../../package-template/package.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import FadeIn from "react-fade-in";
import { Line } from "rc-progress";

class WindowPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
      | Phases:
      */
      prelander: true,
      initialInfo: false,
      questions: false,
      questionShown: 0,
      /**
      | Etc.
      */
      commentShown: 0,
      displayWin: false,
      loaded: 0,
      check1: false,
      check2: false,
      check3: false,
      loader: false
    };
  }

  referer = () => {
    if (this.props.dataReceived.offerwallItems[0].offer.secondLander !== null) {
      return window.open(
        "/sec/" +
          this.props.dataReceived.offerwallItems[0].offer.secondLander.link +
          "/1",
        "_blank"
      );
    } else
      return window.open(
        this.props.dataReceived.offerwallItems[0].offer.offerUrl.url + "1",
        "_blank"
      );
  };

  incrementer = () => {
    this.setState({
      loader: true
    });
    var loader = setInterval(() => {
      this.setState(prevState => ({
        loaded: prevState.loaded + 25
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(loader);
      this.setState({
        loader: false
      });
    }, 5000);
  };

  enterInitialInfo = () => {
    this.setState({
      prelander: false,
      initialInfo: true
    });
  };

  enterQuestions = () => {
    this.setState({
      initialInfo: false,
      questions: true
    });
  };
  nextQuestion = () => {
    this.setState(
      prevState => ({
        questionShown: parseInt(prevState.questionShown + 1)
      }),
      () => {
        console.log("Question displayed: " + this.state.questionShown);
      }
    );
    if (
      this.state.questionShown ===
      this.props.dataReceived.landerText.questions.length - 1
    ) {
      this.incrementer();
      this.setState({
        displayWin: true
      });
    }
  };

  componentDidMount() {
    this.setState({
      currentCommentText: this.props.dataReceived.landerText.comments[
        this.state.commentShown
      ].text,
      currentCommentName: this.props.dataReceived.landerText.comments[
        this.state.commentShown
      ].name,
      commentShown: this.state.commentShown + 1
    });
    setInterval(() => {
      while (
        this.state.commentShown >
        this.props.dataReceived.landerText.comments.length - 1
      ) {
        this.setState({
          commentShown: 0
        });
      }
      this.setState({
        currentCommentText: this.props.dataReceived.landerText.comments[
          this.state.commentShown
        ].text,
        currentCommentName: this.props.dataReceived.landerText.comments[
          this.state.commentShown
        ].name,
        commentShown: this.state.commentShown + 1
      });
    }, 9000);
  }

  render() {
    var { dataReceived } = this.props;
    var {
      prelander,
      initialInfo,
      questions,
      questionShown,
      currentCommentText,
      currentCommentName
    } = this.state;

    var btnColor = {
      color: this.props.dataReceived.brand.hoverButtonColor,
      backgroundColor: this.props.dataReceived.brand.buttonColor
    };
    return (
      <div>
        <div id="questionWrapper">
          {questions ? (
            <div className={styles.qw}>
              <div id="header" className={styles.we}>
                <div className="half">
                  <img
                    className={styles.imgClass1}
                    src={dataReceived.brand.logo}
                  />
                </div>
                <div className="half my-2 w-100 text-center">
                  <h3 className="introText">
                    {dataReceived.landerText.questionsHeaderText}
                  </h3>
                </div>
                <div className={styles.er}></div>
              </div>

              <div className={styles.rt}>
                <div className="question_row">
                  <div id="phonecontainer" className={styles.half}>
                    <img
                      src={dataReceived.offerwallItems[0].offer.item.pictureUrl}
                      className={styles.phone}
                      alt="Phone"
                    />
                  </div>

                  {this.state.displayWin ? (
                    <div className={styles.half}>
                      {this.state.loader ? (
                        <div className="text-center">
                          <h2>{dataReceived.landerText.checkingProductText}</h2>
                          <br />
                          <img
                            src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/loading.gif"
                            className={styles.roundLoader}
                          />
                          <Line
                            percent={this.state.loaded}
                            strokeWidth="2"
                            strokeColor={dataReceived.brand.buttonColor}
                            trailColor="#D3D3D3"
                          />
                          <h2 className={styles.rt}>
                            <i className="fa fa-spinner fa-pulse"></i>&nbsp;
                          </h2>
                          <br />
                        </div>
                      ) : (
                        <div>
                          <h1 className={styles.congratz}>
                            {dataReceived.landerText.completedSurveyP2Text}
                          </h1>
                          <h1 className={styles.gh}>
                            (1) {dataReceived.offerwallItems[0].offer.item.name}
                          </h1>
                          <h3>{dataReceived.landerText.orderShippingText}</h3>
                          <small>
                            {dataReceived.landerText.orderQuantityLeftText}
                          </small>
                          <br />
                          <br />
                          <button
                            style={btnColor}
                            className={styles.mygtuk}
                            onClick={this.referer}
                          >
                            {dataReceived.landerText.surveyExperienceText}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.half}>
                      <h3 className={styles.q0}>
                        {
                          dataReceived.landerText.questions[questionShown]
                            .question
                        }
                      </h3>
                      {dataReceived.landerText.questions[questionShown].answers // parseInt(this.state.questionShown - 1)]
                        .map((item, key) => (
                          <button
                            key={key}
                            className={styles.mygtukAnswer}
                            onClick={this.nextQuestion}
                            style={btnColor}
                          >
                            {item.answer}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          <div id="footerspace"></div>
        </div>

        <div id="system_overlay" className={styles.mainInfo}>
          {prelander ? (
            <div
              className={cx(
                styles.mx_5,
                styles.mt_5,
                styles.prelander,
                styles.ty
              )}
            >
              <div
                className={cx(
                  styles.citazione,
                  styles.mx_5,
                  styles.my_auto,
                  styles.p_3
                )}
              >
                <div>
                  <img
                    src={dataReceived.brand.logo}
                    className={styles.poste}
                    alt="brand"
                  />
                </div>
                <span>
                  {dataReceived.landerText.offerOptionText}
                  <font color="#287799">
                    <strong>{" " + dataReceived.brand.name + ". "}</strong>
                  </font>
                  {dataReceived.landerText.OfferArriveText}
                </span>
              </div>
              <button
                className={styles.mygtuk}
                onClick={this.enterInitialInfo}
                style={btnColor}
              >
                {dataReceived.landerText.thankYouText}
              </button>
            </div>
          ) : null}
          {initialInfo ? (
            <table className={styles.yu}>
              <tbody>
                <tr>
                  <td className={styles.ui}>
                    <div id="system_modal">
                      <div className={styles.system_top}>
                        <img
                          className={styles.imgClass}
                          src={dataReceived.brand.logo}
                          alt="iPhone"
                        />
                        &nbsp;
                        <h1 className={styles.io}>
                          {dataReceived.landerText.websiteTitleText}
                        </h1>
                        <h3 className={styles.op}>
                          <i>{dataReceived.landerText.popUpH3Text}</i>
                        </h3>
                        <h2 className={styles.pa}>
                          {dataReceived.landerText.popUpP1Text}
                        </h2>
                      </div>
                      <div
                        id="system_content"
                        className={styles.system_content}
                      >
                        <s>
                          <h3 className={styles.as}>
                            {dataReceived.landerText.offerPriceText}
                            {" " + dataReceived.locale.currencyTag}
                            {dataReceived.offerwallItems[0].offer.price}
                          </h3>
                        </s>
                        <h1 className={styles.as}>
                          {dataReceived.landerText.offerTodayPriceText}
                          {" " + dataReceived.locale.currencyTag}
                          {dataReceived.offerwallItems[0].offer.shippingPrice}
                        </h1>
                        <br />
                        <div className={styles.sd}>
                          <ul>
                            <li>
                              <FontAwesomeIcon
                                icon={faCheckSquare}
                                className={styles.checkIcon}
                              />

                              {dataReceived.landerText.popUpP2Text + " "}
                              <strong>
                                {dataReceived.landerText.popUpP3Text}
                              </strong>
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faCheckSquare}
                                className={styles.checkIcon}
                              />
                              {dataReceived.landerText.surveyHeaderText + " "}
                              <strong className={styles.df}>
                                (1)
                                {" " +
                                  dataReceived.offerwallItems[0].offer.item
                                    .name}
                              </strong>
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faCheckSquare}
                                className={styles.checkIcon}
                              />
                              {dataReceived.landerText.surveyH4Text + " "}
                              <strong>
                                {dataReceived.landerText.websiteP1Text}
                              </strong>
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faCheckSquare}
                                className={styles.checkIcon}
                              />
                              {dataReceived.landerText.websiteP2Text + " "}
                              <strong>
                                {dataReceived.locale.currencyTag}
                                {
                                  dataReceived.offerwallItems[0].offer
                                    .shippingPrice
                                }
                              </strong>
                            </li>
                          </ul>
                        </div>
                        <br />
                        <button
                          className={styles.mygtuk}
                          style={btnColor}
                          onClick={this.enterQuestions}
                        >
                          {dataReceived.landerText.offerButtonText}
                        </button>
                        <br />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
        <div className="w-100 text-center">
          {questions ? (
            <div className={styles.commentFooter} id="message">
              <FadeIn>
                <p>
                  <span class={styles.message}>
                    {currentCommentText} <b>{currentCommentName}</b>
                  </span>
                </p>
              </FadeIn>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default WindowPackage;
