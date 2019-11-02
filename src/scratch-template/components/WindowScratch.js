import React, { Component } from "react";
import styles from "../components/scratch.module.css";
import cx from "classnames";
import CanvasComponent from "./Canvas";
import scratchBg from "../components/shape-color.png";
import currentDate from "../../dateComponent/Date";

class WindowScratch extends Component {
  constructor(props) {
    super(props);
    this.hideModal = this.hideModal.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.decrement = this.decrement.bind(this);
    this.restart = this.restart.bind(this);
    this.displayLastModal = this.displayLastModal.bind(this);

    this.state = {
      modalShown: true,
      questionShown: 1,
      scratchAttempts: 3,
      layerRemoved: false,
      scratchFinished: false,
      secondCanvasLoaded: 0,
      curTime: "",
      rndNo: Math.floor(Math.random() * 10)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  referer = () => {
    if (this.props.dataReceived.offerwallItems[0].offer.secondLander !== null) {
      return (
        +"/sec/" +
        this.props.dataReceived.offerwallItems[0].offer.secondLander.link +
        "/1"
      );
    } else
      return this.props.dataReceived.offerwallItems[0].offer.offerUrl.url + "1";
  };

  hideModal() {
    console.log("hideModal launched");
    console.log("this.state.modalShown is: " + this.state.modalShown);

    this.setState(
      {
        modalShown: false
      },
      () => {
        console.log("modalShown is now: " + this.state.modalShown);
      }
    );

    if (this.state.scratchFinished) {
      window.open(this.referer());
    }
  }

  displayLastModal() {
    this.setState({
      modalShown: true
    });
  }
  restart() {
    var isDrawing, lastPoint;
    var container = document.getElementById("box"),
      canvas = document.getElementById("canvas"),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      ctx = canvas.getContext("2d"),
      image = new Image(),
      brush = new Image();

    image.src = scratchBg;
    // image.setAttribute("crossOrigin", "");

    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      // Show the form when Image is loaded.
      document.getElementById("product").style.visibility = "visible";
    };
    brush.src =
      "data:image/png;base64,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";

    canvas.addEventListener("mousedown", handleMouseDown, false);
    canvas.addEventListener("touchstart", handleMouseDown, false);
    canvas.addEventListener("mousemove", handleMouseMove, false);
    canvas.addEventListener("touchmove", handleMouseMove, false);
    canvas.addEventListener("mouseup", handleMouseUp, false);
    canvas.addEventListener("touchend", handleMouseUp, false);

    function distanceBetween(point1, point2) {
      return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
      );
    }

    function angleBetween(point1, point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    // Only test every `stride` pixel. `stride`x faster,
    // but might lead to inaccuracy
    function getFilledInPixels(stride) {
      if (!stride || stride < 1) {
        stride = 1;
      }

      var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
        pdata = pixels.data,
        l = pdata.length,
        total = l / stride,
        count = 0;

      // Iterate over all pixels
      for (var i = (count = 0); i < l; i += stride) {
        if (parseInt(pdata[i]) === 0) {
          count++;
        }
      }

      return Math.round((count / total) * 100);
    }

    function getMouse(e, canvas) {
      var offsetX = 0,
        offsetY = 0,
        mx,
        my;

      if (canvas.offsetParent !== undefined) {
        do {
          offsetX += canvas.offsetLeft;
          offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
      }

      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;

      return { x: mx, y: my };
    }
    Element.prototype.remove = function() {
      this.parentElement.removeChild(this);
    };
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
        }
      }
    };

    const handlePercentage = filledInPixels => {
      filledInPixels = filledInPixels || 0;

      console.log(filledInPixels + "%");
      if (filledInPixels > 80) {
        this.props.decrementBound();
      }
    };

    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas);
    }

    function handleMouseMove(e) {
      if (!isDrawing) {
        return;
      }

      e.preventDefault();

      var currentPoint = getMouse(e, canvas),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x,
        y;

      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + Math.sin(angle) * i - 50;
        y = lastPoint.y + Math.cos(angle) * i - 50;
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(brush, x, y);
      }

      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }

    function handleMouseUp(e) {
      isDrawing = false;
    }
  }

  decrement() {
    document.getElementById("attemptLine");

    function fadeOut() {
      var el = document.getElementById("attemptLine");
      el.style.opacity = 1;

      (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }

    function fadeIn(el, display) {
      el.style.opacity = 0;
      el.style.display = display || "inline-block";

      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
        }
      })();
    }
    console.log("decrement launched");
    if (this.state.scratchAttempts == 3) {
      console.log("this.state.scratchAttempts == 3");
      var box = document.getElementById("box");
      var canv = document.getElementById("canvas");
      var attemptLine = document.getElementById("attemptLine");
      fadeOut(canv);
      if (canv != null) {
        canv.remove();
      }
      // document.getElementById("canvas").style.display = 'none'
      else fadeOut(attemptLine);
      setTimeout(() => {
        this.setState(
          () => ({
            scratchAttempts: 2,
            layerRemoved: true
          }),
          () => {
            console.log(
              "this.state.scratchFinished is: " + this.state.scratchFinished
            );
            setTimeout(() => {
              fadeIn(attemptLine);
            }, 50);
          }
        );
      }, 750);

      var isDrawing, lastPoint;
      var box = document.getElementById("box");
      var z = document.createElement("canvas");
      var zWidth = z.width;
      var zHeight = z.height;
      var ctx = z.getContext("2d");
      var image = new Image();
      var brush = new Image();

      image.src = scratchBg;
      // image.setAttribute("crossOrigin", "");

      image.onload = function() {
        ctx.drawImage(image, 0, 0);
        // Show the form when Image is loaded.
        document.getElementById("product").style.visibility = "visible";
      };
      brush.src =
        "data:image/png;base64,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";
      z.setAttribute("class", "secondCanvas");
      z.setAttribute("style", "display:none");

      if (this.state.secondCanvasLoaded <= 0) {
        box.appendChild(z);
      }

      this.setState(prevState => ({
        secondCanvasLoaded: prevState.secondCanvasLoaded + 1
      }));

      setTimeout(() => {
        fadeIn(z);
      }, 500);

      z.addEventListener("mousedown", handleMouseDown, false);
      z.addEventListener("touchstart", handleMouseDown, false);
      z.addEventListener("mousemove", handleMouseMove, false);
      z.addEventListener("touchmove", handleMouseMove, false);
      z.addEventListener("mouseup", handleMouseUp, false);
      z.addEventListener("touchend", handleMouseUp, false);

      function distanceBetween(point1, point2) {
        return Math.sqrt(
          Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
        );
      }

      function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
      }

      // Only test every `stride` pixel. `stride`x faster,
      // but might lead to inaccuracy
      function getFilledInPixels(stride) {
        if (!stride || stride < 1) {
          stride = 1;
        }

        var pixels = ctx.getImageData(0, 0, zWidth, zHeight),
          pdata = pixels.data,
          l = pdata.length,
          total = l / stride,
          count = 0;

        // Iterate over all pixels
        for (var i = (count = 0); i < l; i += stride) {
          if (parseInt(pdata[i]) === 0) {
            count++;
          }
        }

        return Math.round((count / total) * 100);
      }

      function getMouse(e, z) {
        var offsetX = 0,
          offsetY = 0,
          mx,
          my;

        if (z.offsetParent !== undefined) {
          do {
            offsetX += z.offsetLeft;
            offsetY += z.offsetTop;
          } while ((z = z.offsetParent));
        }

        mx = (e.pageX || e.touches[0].clientX) - offsetX;
        my = (e.pageY || e.touches[0].clientY) - offsetY;

        return { x: mx, y: my };
      }
      const handlePercentage = filledInPixels => {
        filledInPixels = filledInPixels || 0;

        console.log(filledInPixels + "%");
        if (filledInPixels > 80) {
          if (this.state.scratchAttempts != 2 || 3) {
            console.log("Im working");
            var canv = document.getElementsByClassName("secondCanvas");
            canv.remove();
            var lastButton = document.getElementById("lastButton");
            fadeIn(lastButton);
            this.setState({
              scratchFinished: true
            });
          }
          // this.scratchInitiator();
          else this.props.decrementBound();
        }
      };

      function handleMouseDown(e) {
        isDrawing = true;
        lastPoint = getMouse(e, z);
      }

      function handleMouseMove(e) {
        if (!isDrawing) {
          return;
        }

        e.preventDefault();

        var currentPoint = getMouse(e, z),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x,
          y;

        for (var i = 0; i < dist; i++) {
          x = lastPoint.x + Math.sin(angle) * i - 50;
          y = lastPoint.y + Math.cos(angle) * i - 50;
          ctx.globalCompositeOperation = "destination-out";
          ctx.drawImage(brush, x, y);
        }

        lastPoint = currentPoint;
        handlePercentage(getFilledInPixels(32));
      }

      function handleMouseUp(e) {
        isDrawing = false;
      }
    }
  }

  nextQuestion() {
    this.setState(
      prevState => ({
        questionShown: parseInt(prevState.questionShown + 1)
      }),
      () => {
        console.log("Question displayed: " + this.state.questionShown);
      }
    );
  }

  render() {
    var { dataReceived } = this.props;
    var likesArray = [8, 19, 10, 4, 15, 22, 27];

    var text = dataReceived.landerText;
    var fullHeight = {
      height: "100%"
    };
    var fadeOut = {
      opacity: "0 !important",
      width: "0 !important",
      height: "0 !important",
      transition: "width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s !important"
    };
    var fadeIn = {
      opacity: "1 !important",
      display: "block !important",
      transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s !important"
    };

    var dNone = {
      display: "none"
      // height: '0 !important',
      // width: '0 !important'
    };

    var dBlock = {
      display: "block !important"
      // height: '100px !important',
      // width: '100px !important'
    };
    var btnColor = {
      // color:`${dataReceived.brand.hoverButtonColor} !important`,
      color: dataReceived.brand.hoverButtonColor,

      backgroundColor: dataReceived.brand.buttonColor
    };
    var headerBorder = {
      borderBottom: `1px solid ${dataReceived.brand.buttonColor}`
    };

    return (
      <div>
        <div
          // className={cx(styles.modal, styles.ui)}
          className={
            "modal1 " +
            (this.state.modalShown
              ? styles.fadeIn + styles.modal
              : styles.fadeOut)
          }
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="false"
          // onClick={() => this.setState({
          //   modalShown: false
          // })}
          style={this.state.modalShown ? fadeIn : fadeOut}
        >
          <div className={styles.modalDialog}>
            <div className={cx(styles.modalContent, styles.op)}>
              <div className={styles.modalBody}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={dataReceived.brand.logo}
                          alt=""
                          className={styles.as}
                        />
                        <p className={styles.df}>
                          {this.state.scratchFinished
                            ? text.orderShippingText
                            : text.popUpH3Text}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={cx(styles.btn, styles.gh)}
                  data-dismiss="modal"
                  id="btn-open"
                  onClick={this.hideModal}
                  style={btnColor}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.modalShown ? styles.coverBlurred : styles.uncovered
          }
        >
          <div id="light" className={styles.white_content}>
            <img src={dataReceived.brand.logo} className={styles.qw} />
            <p className={styles.er}>{text.orderShippingText}</p>
            <br />
            <div className={styles.modalFooter}>
              <a
                href={dataReceived.offerwallItems[0].offer.offerUrl.url + 1}
                target="_blank"
              >
                <button
                  type="button"
                  className={cx(styles.ty, styles.btn, styles.btnPrimary)}
                  data-dismiss="modal"
                >
                  OK
                </button>
              </a>
            </div>
          </div>

          <div className={cx(styles.header, styles.jk)}>
            <div className={styles.lz}>
              <img src={dataReceived.brand.logo} className={styles.xc} />
              <div className={styles.navBar}>
                <a href="#">
                  <div className={styles.block} style={headerBorder}>
                    <p>{text.websiteTitleText.split(",")[0]}</p>
                  </div>
                </a>
                <a href="#">
                  <div className={styles.block} style={headerBorder}>
                    <p>{text.websiteTitleText.split(",")[1]}</p>
                  </div>
                </a>
                <a href="#">
                  <div className={styles.block} style={headerBorder}>
                    <p>{text.websiteTitleText.split(",")[2]}</p>
                  </div>
                </a>
                <a href="#">
                  <div className={styles.block} style={headerBorder}>
                    <p>{text.websiteTitleText.split(",")[3]}</p>
                  </div>
                </a>
                <a href="#">
                  <div
                    className={cx(styles.block, styles.blockY, styles.vb)}
                    style={headerBorder}
                  >
                    <p className={styles.nm}>
                      {text.websiteTitleText.split(",")[4]}
                    </p>
                  </div>
                </a>
                <a href="#">
                  <img
                    src="scratch/ScratchFiles/ico-cerca.png"
                    alt=""
                    className={styles.mn}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.spacer}></div>
          <div className={cx(styles.wrapper, styles.margTop, styles.bv)}>
            {this.state.questionShown < 2 ? (
              <div className={cx(styles.wrapper, styles.contestwrap)}>
                <div className={styles.toptext}>
                  <table className={styles.wrapper}>
                    <tbody>
                      <tr>
                        <td align="left" valign="top">
                          <br />
                          <span className={styles.dat1}>
                            {this.state.curTime}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 className={styles.cx}> {text.surveyH4Text}</h4>
                  <div className={styles.zl}>
                    <p className={cx(styles.wrapper, styles.kj)}>
                      {text.websiteP1Text}
                      <br />
                      <br />
                      {text.websiteP2Text}
                    </p>
                  </div>
                  <div
                    className={cx(styles.wrapper, styles.select2, styles.hg)}
                  >
                    <b className={styles.fd}>{text.popUpP2Text + ": "}</b>
                    {text.popUpP3Text}
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.questionShown - 1 < text.questions.length ? (
              <div
                className={cx(styles.wrapper, styles.form_questions, styles.sa)}
                data-step="1"
              >
                {/* Question */}
                <div
                  className={cx(
                    styles.question,
                    styles.q + this.state.questionShown,
                    styles.po
                  )}
                >
                  <h2 className={styles.question__title}>
                    {text.questionsHeaderText + " "}
                    <span className={styles.question__num}></span>
                    {this.state.questionShown}/{text.questions.length}:{" "}
                  </h2>
                  <h2 className={styles.question__title}>
                    {text.questions[this.state.questionShown - 1].question}
                  </h2>

                  {/* Answers map */}
                  {text.questions[
                    parseInt(this.state.questionShown - 1)
                  ].answers.map((answer, key) => (
                    <div
                      className={cx(styles.button, styles.answer, styles.iu)}
                      key={key}
                      style={btnColor}
                    >
                      <button
                        className={cx(styles.button__text, styles.yt)}
                        onClick={this.nextQuestion}
                        style={btnColor}
                      >
                        {answer.answer}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={cx(
                  styles.prize,
                  styles.wrapper,
                  styles.conPrize1,
                  styles.dBlock
                )}
                data-step="3"
                style={dBlock}
              >
                <div className={styles.samsungShow}></div>
                <h2 className={styles.gifts__title}>
                  {this.state.scratchFinished
                    ? text.completedSurveyP2Text
                    : text.completedSurveyP1Text}
                </h2>
                <h2
                  className={cx(
                    styles.gifts__title,
                    styles.hide,
                    styles.gifts__titleResult
                  )}
                ></h2>

                {this.state.scratchFinished ? null : (
                  <p className={styles.attempt}>
                    {text.orderQuantityLeftText}:{" "}
                    <span className={styles.attempt__num} id="attemptLine">
                      {this.state.scratchAttempts}
                    </span>
                  </p>
                )}

                <CanvasComponent
                  dataReceived={dataReceived}
                  decrementBound={this.decrement}
                  scratchAttempts={this.state.scratchAttempts}
                  layerRemoved={this.state.layerRemoved}
                />

                <div
                  className={cx(styles.gifts__result, styles.hide)}
                  id={"lastButton"}
                >
                  <div
                    className={cx(styles.button, styles.vcx)}
                    style={btnColor}
                  >
                    <a
                      className={styles.gift__shape}
                      className={styles.button__text}
                      onClick={this.displayLastModal}
                    >
                      {text.offerButtonText}
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.spacer}></div>
            <div className={cx(styles.wrapper, styles.reviews)}>
              <div className={styles.wrapper1}>
                <h2>{text.commentButtonText}</h2>
              </div>

              {/* Comments loop */}

              {text.comments.map((comment, key) => (
                <div key={key}>
                  <table className={cx(styles.wrapper, styles.fds)} id="fb5">
                    <tbody>
                      <tr>
                        <td width="50px" valign="top" align="right">
                          <div className={cx(styles.roundimg, styles.s11m)}>
                            <img src={comment.photo} />
                          </div>
                        </td>
                        <td
                          align="left"
                          valign="top"
                          className={styles.commentpad}
                        >
                          <div className={styles.name}>{comment.name}</div>
                          <div className={styles.text}>{comment.text}</div>
                          <div className={styles.qqq}>
                            <div className={styles.kkk}>
                              <div className={styles.date}>
                                <a href="#" className={styles.otvet}>
                                  {text.surveyExperienceText}
                                </a>
                              </div>
                              <div className={cx(styles.likeQ, styles.likes0)}>
                                <img
                                  src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/like-fb.png"
                                  alt=""
                                  className={styles.kjh}
                                />
                                {likesArray[key]}
                                {}
                                {/* {this.setState((prevState) =>
                                    rndNo: prevState.rndNo * 1.5
                                  
                                )} */}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.jhg}></div>
                </div>
              ))}
            </div>
          </div>
          <footer>
            <img src={dataReceived.brand.logo} alt="" className={styles.poi} />

            <div className={styles.footerDiv}>
              <img
                className={styles.block_logo}
                src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/block_logo.png"
              />
              <br />
              <img
                src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/ssl_sert.png"
                className={styles.secureimg}
              />
              <h4>2019 All Rights Reserved.</h4>

              <small className="mt-5">
                This website is not affiliated with or endorsed by Carrefour and
                does not claim to represent, or own any of the trademarks,
                tradenames or rights associated with any of the products which
                are the property of their respective owners who do not own,
                endorse, or promote this site. All images on this site are
                readily available in various places on the Internet and believed
                to be in public domain according to the U.S. Copyright Fair Use
                Act (title 17, U.S. Code). *Trial offers offered on the last
                page require shipping and handling fees. See manufacturer's site
                for details as terms vary with offers.
              </small>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
export default WindowScratch;
