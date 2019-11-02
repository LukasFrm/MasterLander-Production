import React, { Component } from "react";
import cx from "classnames";
import styles from "../second-template/secondLander.module.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoadingComponent from "./components/LoadingComponent";
import WinComponent from "./components/WinComponent";

class WindowSecond extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: true,
      dropdownOpen: false,
      toggle: true,
      questionShown: 0,
      questionsPhase: true,
      loadingPhase: false,
      check1: false,
      check2: false,
      check3: false,
      winPhase: false,
      samsungTemplate: false,
      appleTemplate: false
    };
  }

  referer = () => {
    var offerLink1 = this.props.dataReceived.offer.offerUrl.url
    var offerLink2 = offerLink1.slice(0, offerLink1.length - 1) + /[^/]*$/.exec(window.location.href)[0]
    
    window.open(
      offerLink2,
      "_blank"
    );
  };

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  dropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  nextQuestion = () => {
    if (
      this.state.questionShown ===
      this.props.dataReceived.text.questions.length - 1
    ) {
      this.setState({
        questionsPhase: false,
        loadingPhase: true,
        check1: true
      });
      setInterval(() => {
        this.setState({
          check2: true
        });
      }, 1000);
      setInterval(() => {
        this.setState({
          check3: true
        });
      }, 2000);
      setInterval(() => {
        this.setState({
          loadingPhase: false,
          winPhase: true
        });
      }, 4000);
    } else
      this.setState(
        prevState => ({
          questionShown: parseInt(prevState.questionShown + 1)
        }),
        () => {
          console.log("Question displayed: " + this.state.questionShown);
        }
      );
  };

  componentDidMount() {


    if (this.props.dataReceived.template.name === "s10") {
      this.setState({
        samsungTemplate: true
      });
    } else if (this.props.dataReceived.template.name === "XS") {
      this.setState({
        appleTemplate: true
      });
    }
  }

  render() {
    var { modal, questionShown, check1, check2, check3 } = this.state;
    var { dataReceived } = this.props;
    // var checkers = dataReceived.text.websiteTitleText.split(",");

    var btnStyle = {
      fontSize: "20px",
      padding: "10px",
      backgroundColor: this.props.dataReceived.brand.buttonColor,
      color: this.props.dataReceived.brand.hoverButtonColor
    };
    var headerStyle = {
      backgroundColor: this.props.dataReceived.brand.buttonColor
    };
    var likesArray = [15, 27, 7, 9, 21, 27, 4];

    return (
      <div>
        <Modal isOpen={modal} className="mt-5">
          <ModalHeader>
            <p className="font-weight-bold">
              {dataReceived.text.surveyHeaderText}
            </p>
          </ModalHeader>
          <ModalBody>
            <p>{dataReceived.text.popUpH3Text}</p>
            <p>{dataReceived.text.popUpP1Text}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="btn w-100"
              onClick={this.closeModal}
              style={btnStyle}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
        <div className={styles.header_style} style={headerStyle}>
          {this.state.samsungTemplate ? (
            <img
              src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/samsunglogo.png"
              className={styles.brandLogo}
              alt='brand'
            />
          ) : null}

          {this.state.appleTemplate ? (
            <img
              src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/applelogo.png"
              className={styles.brandLogo}
              alt='brand'
            />
          ) : null}
        </div>
        <div className={styles.maindiv}>
          <img
            src={dataReceived.brand.logo}
            className={styles.productionLogo}
            alt='production'
          />
          {this.state.questionsPhase ? (
            <div className={styles.maincnt}>
              <div>
                {" "}
                <h1>{dataReceived.text.surveyHeaderText}</h1>
                <h2>{dataReceived.text.surveyH4Text}</h2>
                <p className='my-2'>{dataReceived.text.websiteP1Text}</p>
                <p className='my-2'>{dataReceived.text.websiteP2Text}</p>
                <span className='text-danger'>{dataReceived.text.thankYouText}</span>
                <div>
                  <p></p>

                  <div className="text-center mt-1">
                    <h1 className={cx(styles.questionGroup, styles.question)}>
                      {dataReceived.text.leaveCommentText} {questionShown + 1}/
                      {dataReceived.text.questions.length}
                      {":"}
                    </h1>
                    <p className={styles.q1}>
                      {
                        dataReceived.text.questions[this.state.questionShown]
                          .question
                      }
                    </p>
                  </div>

                  <div className="answerGroup">
                    {dataReceived.text.questions[
                      this.state.questionShown
                    ].answers.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className="btn btn-primary w-100 my-2 p-2"
                          style={btnStyle}
                          onClick={this.nextQuestion}
                        >
                          {item.answer}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.loadingPhase ? (
            <LoadingComponent
              dataReceived={dataReceived}
              check1={check1}
              check2={check2}
              check3={check3}
            />
          ) : null}

          {this.state.winPhase ? (
            <WinComponent
              dataReceived={dataReceived}
              btnStyle={btnStyle}
              likesArray={likesArray}
              referer={this.referer}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default WindowSecond;
