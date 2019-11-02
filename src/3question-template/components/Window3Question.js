import React, { Component } from "react";
import MainOne from "./mains/MainOne";
import MainTwo from "./mains/MainTwo";
import MainThree from "./mains/MainThree";
import MainFour from "./mains/MainFour";
import MainFive from "./mains/MainFive";
import MainSix from "./mains/MainSix";
import Footer from "./Footer";
import styles from "../components/threeQuestion.module.css";

export class Window3Question extends Component {
  constructor() {
    super();

    /////////////////// DATA AND QUESTIONS STATES/////////////////////

    this.state = {
      stageOne: true,
      stageTwo: false,
      stageThree: false,
      stageFour: false,
      stageFive: false,
      stageSix: false,
      currentKey: 0
    };

    //////////////////// METHODS ARE BOUND TO STATES/////////////////////////////

    this.ChangeCurrentKey = this.ChangeCurrentKey.bind(this);
    this.FirstBtnClick = this.FirstBtnClick.bind(this);
    this.SecondBtnClick = this.SecondBtnClick.bind(this);
  }

  ///////////////LOCAL METHODS////////////////////////

  FirstBtnClick() {
    this.setState({
      stageOne: false,
      stageTwo: true
    });

    setTimeout(() => {
      this.setState({
        stageTwo: false,
        stageThree: true
      });
    }, 1800);
  }

  SecondBtnClick() {
    this.setState({
      stageThree: false,
      stageFour: true
    });
  }

  ChangeCurrentKey() {
    var { currentKey } = this.state;
    var { dataReceived } = this.props;

    setTimeout(() => {
      this.setState(prevState => ({
        currentKey: prevState.currentKey + 1
      }));
    }, 250);

    if (currentKey + 1 === dataReceived.landerText.questions.length) {
      setTimeout(() => {
        this.setState({
          stageFour: false,
          stageFive: true
        });
      }, 500);

      setTimeout(() => {
        this.setState({
          stageSix: true
        });
        setTimeout(() => {
          this.setState({
            stageFive: false,
            stageSix: false,
            stageSeven: true
          });
          console.log("stageSeven: true");
        }, 3000);
        console.log("stageSix: true");
      }, 2000);
    }
  }

  render() {
    var {
      stageOne,
      stageTwo,
      stageThree,
      stageFour,
      stageFive,
      stageSix,
      stageSeven,
      currentKey
    } = this.state;

    var { dataReceived, isFetched } = this.props;

    return (
      <div>
        <style>
          {`
            :root {
              --buttonColor: ${dataReceived.brand.buttonColor};
              --hoverButtonColor: ${dataReceived.brand.hoverButtonColor};
              }
            `}
        </style>
        <div className={styles.page}>
          <header className={styles.header}>
            <img
              src={dataReceived.brand.logo}
              alt="Icon"
              className={styles.header__icon}
            />
          </header>

          <MainOne
            stageOne={stageOne}
            stageTwo={stageTwo}
            dataReceived={dataReceived}
            FirstBtnClick={this.FirstBtnClick}
          />

          <MainTwo
            stageTwo={stageTwo}
            stageThree={stageThree}
            dataReceived={dataReceived}
          />

          <MainThree
            stageThree={stageThree}
            stageFour={stageFour}
            dataReceived={dataReceived}
            SecondBtnClick={this.SecondBtnClick}
          />

          <MainFour
            stageFour={stageFour}
            dataReceived={dataReceived}
            isFetched={isFetched}
            currentKey={currentKey}
            ChangeCurrentKey={this.ChangeCurrentKey}
          />
          <MainFive stageFive={stageFive} stageSix={stageSix} />
          <MainSix stageSeven={stageSeven} dataReceived={dataReceived} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Window3Question;
