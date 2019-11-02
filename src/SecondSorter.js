//Global imports
import React, { Component } from "react";
import LoadingBar from "./LoadingBar";
import ErrorPage from "./ErrorPage";
import "./App.css";

//second lander imports
import WindowSecond from "./second-template/WindowSecond";

export class SecondSorter extends Component {
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
      fetchIP: ''
    };
  }

  componentDidCatch(err, info) {
    console.log(err + info);
  }

  async componentDidMount() {
    console.log("componentDidMount");

    var template = this.props.match.params.id;
    var jsonNoPhone;

    await fetch(process.env.PUBLIC_URL + "/config.json")
      .then(res => res.json())
      .then(json =>
        this.setState({
          fetchIP: json["IP"]
        })
      );

    fetch("http://" + this.state.fetchIP + "/sec/" + template)
      .then(res => res.json())
      .then(json => {
        // Replaces all [BRAND] text entries

        // In text
        let brand = json.brand.name;
        let phone = json.offer.item.name;
        var cleanStage1 = json;

        Object.keys(json.text).forEach(function(key) {
          if (typeof json.text[key] === "string") {
            let keyValue1 = json.text[key];
            let brandReplaced = keyValue1.replace(/\[BRAND\]/g, brand);
            cleanStage1.text[key] = brandReplaced;
          }
        });
        // In questions
        json.text.questions.map((item, index) => {
          let questionText = item.question;
          let questionBrandReplace = questionText.replace(/\[BRAND\]/g, brand);
          console.log(questionBrandReplace);

          cleanStage1.text.questions[index].question = questionBrandReplace;
        });

        // // Replaces all [PHONE] text entries

        // In text
        Object.keys(cleanStage1.text).forEach(function(key) {
          if (typeof cleanStage1.text[key] === "string") {
            let keyValue1 = cleanStage1.text[key];
            let brandReplaced = keyValue1.replace(/\[PHONE\]/g, phone);
            cleanStage1.text[key] = brandReplaced;
          }
        });

        // In questions
        json.text.questions.map((item, index) => {
          let questionText = item.question;
          let questionPhoneReplace = questionText.replace(/\[PHONE\]/g, phone);
          console.log(questionPhoneReplace);
          cleanStage1.text.questions[index].question = questionPhoneReplace;
        });

        // In comments
        if (cleanStage1.text.comments.length > 0) {
          Object.keys(cleanStage1.text.comments).forEach(function(key) {
            jsonNoPhone = cleanStage1;
            let keyValue2 = json.text.comments[key].text;
            let phoneReplaced = keyValue2.replace(/\[PHONE\]/g, phone);
            jsonNoPhone.text.comments[key].text = phoneReplaced;
            console.log(phoneReplaced);
          });
        } else jsonNoPhone = cleanStage1;

        this.setState(
          {
            isFetched: true,
            dataReceived: json,
            renderedTemplate: json.template.name
          },
          () => {
            console.log(this.state.renderedTemplate);
          }
        );
      });
  }

  render() {
    var { renderedTemplate, isFetched, dataReceived } = this.state;
    var fullHeight = {
      height: "100%"
    };

    if (!isFetched) {
      return <LoadingBar />;
    } else
      return (
        <div style={fullHeight}>
          {(() => {
            switch (renderedTemplate) {
              case "s10":
                return (
                  console.log("s10 chosen"),
                  (
                    <WindowSecond
                      isFetched={isFetched}
                      dataReceived={dataReceived}
                    />
                  )
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
export default SecondSorter;
