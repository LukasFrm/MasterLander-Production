//Global imports
import React, { Component } from "react";
import LoadingBar from "./LoadingBar";
import ErrorPage from "./ErrorPage";
import "./App.css";

//3question imports
import Window3Question from "./3question-template/components/Window3Question";

//scratch imports
import WindowScratch from "./scratch-template/components/WindowScratch";

//imgBgNew imports
import WindowImgBgNew from "./imgBgNew-template/components/WindowImgBgNew";

//package imports
import WindowPackage from "./package-template/components/WindowPackage";

//second lander imports
import WindowSecond from "./second-template/WindowSecond";

export class Sorter extends Component {
  constructor() {
    super();

    this.state = {
      //Global states
      isFetched: false,
      dataReceived: null,

      // 3question states
      stageOne: true,
      stageTwo: false,
      stageThree: false,
      stageFour: false,
      stageFive: false,
      stageSix: false,
      currentKey: 0,
      fetchIP: "",
      error: false
    };
  }

  componentDidCatch(err, info) {
    this.setState({
      error: true
    })
  }

  async componentDidMount() {
    var template = this.props.match.params.id;
    var jsonNoPhone;

    await fetch(process.env.PUBLIC_URL + "/config.json")
      .then(res => res.json())
      .then(json =>
        this.setState({
          fetchIP: json["IP"]
        })
      );

    fetch('http://' + this.state.fetchIP + "/randomlander/get/" + template)
      .then(res => res.json())
      .then(json => {

        // In landerText
        let brand = json.brand.name;
        let phone = json.offerwallItems[0].offer.item.name;
        var cleanStage1 = json;
        Object.keys(json.landerText).forEach(function(key) {
          if (typeof json.landerText[key] === "string") {
            let keyValue1 = json.landerText[key];
            let brandReplaced = keyValue1.replace(/\[BRAND\]/g, brand);
            cleanStage1.landerText[key] = brandReplaced;
          }
        });
        // In questions
        json.landerText.questions.map((item, index) => {
          let questionText = item.question;
          let questionBrandReplace = questionText.replace(/\[BRAND\]/g, brand);

          cleanStage1.landerText.questions[
            index
          ].question = questionBrandReplace;
        });

        // // Replaces all [PHONE] text entries

        // In landerText
        Object.keys(cleanStage1.landerText).forEach(function(key) {
          if (typeof cleanStage1.landerText[key] === "string") {
            let keyValue1 = cleanStage1.landerText[key];
            let brandReplaced = keyValue1.replace(/\[PHONE\]/g, phone);
            cleanStage1.landerText[key] = brandReplaced;
          }
        });

        // In questions
        json.landerText.questions.map((item, index) => {
          let questionText = item.question;
          let questionPhoneReplace = questionText.replace(/\[PHONE\]/g, phone);
          cleanStage1.landerText.questions[
            index
          ].question = questionPhoneReplace;
        });

        // In comments
        if (cleanStage1.landerText.comments.length > 0) {
          Object.keys(cleanStage1.landerText.comments).forEach(function(key) {
            jsonNoPhone = cleanStage1;
            let keyValue2 = json.landerText.comments[key].text;
            let phoneReplaced = keyValue2.replace(/\[PHONE\]/g, phone);
            jsonNoPhone.landerText.comments[key].text = phoneReplaced;
          });
        } else jsonNoPhone = cleanStage1;
      })
      .then(() =>
        this.setState(
          {
            isFetched: true,
            dataReceived: jsonNoPhone,
            renderedTemplate: jsonNoPhone.template.name
          }
        )
      ).catch(err => {
        console.log(err)
        this.setState({
          error:true
        })
      })
  }

  render() {
    var { renderedTemplate, isFetched, dataReceived, error } = this.state;
    var fullHeight = {
      height: "100%"
    };

    if (!isFetched) {
      return <LoadingBar error={error} />;
    } else
      return (
        <div style={fullHeight}>
          {(() => {
            switch (renderedTemplate) {
              case "3question":
                return (
                  <Window3Question
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "scratch":
                return (
                  <WindowScratch
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "imgbgNew":
                return (
                  <WindowImgBgNew
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "baseNew":
                return (
                  <WindowImgBgNew
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "base":
                return (
                  <WindowImgBgNew
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );

              case "package":
                return (
                  <WindowPackage
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "S10":
                return (
                  <WindowSecond
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case "XS":
                return (
                  <WindowSecond
                    isFetched={isFetched}
                    dataReceived={dataReceived}
                  />
                );
              case undefined:
                return <ErrorPage />;
              default:
                return (
                  <div>
                    <ErrorPage />
                  </div>
                );
            }
          })()}
        </div>
      );
  }
}
export default Sorter;
