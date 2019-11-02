import React, { Component } from "react";
import { Line } from "rc-progress";

import cx from "classnames";
import styles from "../components/imgBgNew.module.css";


export class WindowImgBgNew extends Component {
  constructor() {
    super();

    this.state = {
      questionDisplayed: 0,
      loaded: 0,
      questionTotal: 0,
      hideCountryandFlag: false,
      loadBarText : ''
    };
  }

referer = (x) => {
  if (this.props.dataReceived.offerwallItems[x].offer.secondLander !== null) {
    return (
     '/sec/' 
    + this.props.dataReceived.offerwallItems[x].offer.secondLander.link + "/" + parseInt(x + 1))
  }
  else return this.props.dataReceived.offerwallItems[x].offer.offerUrl.url + parseInt(x + 1)
}

  questionRender = () => {
    this.setState(
      prevState => ({
        questionDisplayed: prevState.questionDisplayed + 1,
        questionTotal: this.props.dataReceived.landerText.questions.length,
        loadBarText: this.props.dataReceived.landerText.checkingProductText
      }),
      function() {
        if (this.state.questionDisplayed >= this.state.questionTotal) {
          this.loadTheBar();
        }
      }
    );
  };

  incrementer = () => {
    var belekas = setInterval(() => {
      setInterval(() => {
        this.setState(prevState => ({
          loaded: 25
        }));
      }, 500);
      clearInterval();
      setInterval(() => {
        this.setState(prevState => ({
          loaded: 50
        }));
      }, 1000);
      clearInterval();

      setInterval(() => {
        this.setState(prevState => ({
          loaded: 75
        }));
      }, 1500);
      clearInterval();

      setInterval(() => {
        this.setState(prevState => ({
          loaded: 100
        }));
      }, 2000);
      clearInterval(belekas);
    }, 3000);
  };

  loadTheBar = () => {
this.setState({
  hideCountryandFlag : !this.state.hideCountryandFlag,
})

    var interval1 = setInterval(() => {

      this.setState(
        prevState => ({
          loaded: prevState.loaded + 24.5,
        }),
      );
    }, 900);


    setTimeout(() => {
      clearInterval(interval1);
      this.setState({
        loadBarText: ''
      })

    }, 4500);

    setTimeout(() => {
      this.setState(prevState => ({
        loaded: prevState.loaded + 1,
      }));
    }, 5000);
  }

  

  render() {
    var { dataReceived } = this.props;

    var bgImageStyle = {
      backgroundRepeat: "noRepeat",
      backgroundSize: "cover",
      backgroundImage: `url(${dataReceived.brand.backgroundImg})`
    };

    var btnColor = {
      // color:`${dataReceived.brand.hoverButtonColor} !important`,
      color:dataReceived.brand.hoverButtonColor,

      backgroundColor: dataReceived.brand.buttonColor, 
    }

    var loadingText = {
      margin : '15px'
    }

    return (
      <div>
        <div className={cx(styles.wrapper, styles.qw)} style={bgImageStyle}>
          <div className={styles.header}>
            <div className={styles.header_top}>
              <div className={cx(styles.top_title, styles.we)}>
                2019 {dataReceived.landerText.surveyHeaderText}
                <span className={styles.finalSpan}>
                  <img src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/gift.png" alt="gift"/>
                </span>
              </div>
              <div className={styles.header_wrapp}>
                <div className={styles.text_title}>
                  <h1>
                    <img
                      className={cx(styles.er)}
                      src={dataReceived.brand.logo}
                      alt='logo'
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content_center}>

            {this.state.hideCountryandFlag ? 
            <p className={cx(styles.country_name, styles.rt)} style={loadingText}>
            {this.state.loadBarText}
          </p> : <p className={cx(styles.country_name, styles.rt)}>
            <span className={cx(styles.flag, styles.mx_auto)}>
              <img
                src={dataReceived.locale.flag}
                className={styles.flg}
                alt="flag"
              />
            </span>
            {dataReceived.locale.fullCountryName}
          </p>}
            <p></p>


            {this.state.loaded < 99 ? 
              (<div className={styles.container_center}>
              {this.state.questionDisplayed < 1 ? (
                <div className={styles.operator_block}>
                  <div className={styles.operator_wrapp}>
                    <div className={styles.operator_foto}>
                      <span>
                        <img src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/operator_cl.png" alt='operator'/>
                      </span>
                    </div>
                    <div className={styles.operator_text}>
                      <div className={styles.text1}>
                        <p className={styles.as}>
                          {dataReceived.landerText.surveyH4Text}
                        </p>
                        <p>{dataReceived.landerText.websiteP1Text}</p>
                        <p>{dataReceived.landerText.websiteP2Text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className={styles.section}>
                {this.state.questionDisplayed <
                dataReceived.landerText.questions.length ? (
                  <div id="question_border" className={styles.question_border}>
                    <div className={styles.question_block}>
                      <div className={styles.question}>
                        <div
                          className={cx(styles.form_content_block, styles.q1)}
                        >
                          <div className={styles.form_content}>
                            <div className={styles.header_quest}>
                              <div className={styles.step_question}>
                                {dataReceived.landerText.questionsHeaderText + " "}
                                {parseInt(this.state.questionDisplayed + 1)}/
                                {dataReceived.landerText.questions.length}:
                              </div>
                              <div className={styles.question_des}>
                                {
                                  dataReceived.landerText.questions[
                                    this.state.questionDisplayed
                                  ].question
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.form_quest}>
                      {dataReceived.landerText.questions[
                        this.state.questionDisplayed
                      ].answers.map((item, index) => {
                        return (
                          <ul key={index}>
                            <button
                              className={cx(styles.qbutton, styles.mx_auto)} style={btnColor}
                              onClick={this.questionRender}
                            >
                              {item.answer}
                            </button>
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                ) : this.state.loaded <= 99 ? (
                  <Line
                    percent={this.state.loaded}
                    strokeWidth="2"
                    strokeColor={dataReceived.brand.buttonColor}
                    trailColor="#D3D3D3"
                  />
                ) : null}

                <div className={styles.yu}>
                  <span className={styles.ui}>
                    {dataReceived.landerText.antiSpamText}
                  </span>
                  <span className={styles.io}>
                    <span className={styles.red}>
                      {dataReceived.landerText.OfferArriveText}
                    </span>
                  </span>
                </div>
              </div>
              </div>) : null }


{this.state.loaded > 99 ? (
<div>
<div className={styles.content_center}>
<div className={styles.container_center}>

                <div className={styles.operator_block}>
                  <div className={styles.operator_wrapp}>
                    <div className={styles.operator_foto}>
                <span><img src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/operator_cl.png" alt='operator'/></span>
            </div>
            <div className={styles.operator_text}>

                <div className={styles.text1}>
                    <p><b>{dataReceived.landerText.completedSurveyH4Text}</b></p>
                    <p>{dataReceived.landerText.completedSurveyP1Text}</p>
                    {/* <span><img src='https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/fire_icon.png' alt="Fire" className={styles.fireball}/>
                    <p className={styles.underload}> {dataReceived.landerText.completedSurveyP2Text}
                    </p>
                    </span> */}
                </div>
            </div>
        </div>
    </div>
</div>

<div className={styles.question} id="gift1">
    <div className={styles.question_p_border}>
        <div className={styles.product_desctop}>
            <div className={styles.form_quest} id="products_wrapper">
            {dataReceived.offerwallItems.map((iterated, index) => {
              return <div className={cx(styles.row_pducts, styles.clearfix, styles.gift,  styles.open_prod_iphone)}>
                
                    <div className={styles.img_p}>
                        <div className={styles.img}><span className={styles.favor_icon}><span></span></span>
                        <img src={iterated.offer.item.pictureUrl} alt='offer'/>

                        </div>
                        <div className={styles.rating_block}>
                            <ul>
                                <li><span className={cx(styles.fa, styles.fa_star,  styles.checked_star)}></span></li>
                                <li><span className={cx(styles.fa, styles.fa_star,  styles.checked_star)}></span></li>
                                <li><span className={cx(styles.fa, styles.fa_star,  styles.checked_star)}></span></li>
                                <li><span className={cx(styles.fa, styles.fa_star,  styles.checked_star)}></span></li>
                                <li><span className={cx(styles.fa, styles.fa_star,  styles.checked_star)}></span></li>
                                {Math.floor(Math.random() * 100)+100}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.des_prod}>
                    
                       <div>
                        <div className={styles.name_prod}>
                            
                                <span>{iterated.offer.item.name}</span>
                            
                        </div>
                        <div className={styles.left_item_product}>
                            <div className={cx(styles.price_no,  styles.price_desctop)}>
                                <span className={styles.np}>{dataReceived.landerText.offerPriceText + " "}
                        <span>{dataReceived.locale.currencyTag}{iterated.offer.price}</span>
                                </span>
                                <span className={styles.tp}>
                        <b>{dataReceived.landerText.offerTodayPriceText}</b>
                        <b className={styles.blink}>{" " + dataReceived.locale.currencyTag} 0.00!</b>
                        </span>
                                <span className={styles.sp}>{dataReceived.landerText.orderShippingText + " "} <b>{dataReceived.locale.currencyTag} {iterated.offer.shippingPrice}</b></span>
                                <span className={styles.remaining}>{dataReceived.landerText.orderQuantityLeftText}
                        <span>
                        <span className={styles.time2}></span><b>{" "+iterated.offer.quantityLeft}</b></span>
                                </span>
                            </div>
                        </div>
                        </div>

                   
                    </div>
                    <a href={this.referer(index)}>
                    <div className={styles.prod_button }>
                        <div className={styles.right_item_product}>
                            <button className={styles.button} style={btnColor}><span>{dataReceived.landerText.offerButtonText}</span></button> 
                  </div>
                       
                    </div>
                    
                    </a>
                </div>
               
                })}

                </div>                </div>
                </div>



    <div id="comment" className={styles.comment}>
        <div className={styles.title_comment_row}>
            <div className={cx(styles.addCommentBox,  styles.clearfix)}>
                <div className={styles.title_cf}>{dataReceived.landerText.surveyExperienceText}</div>
                <div className={styles.title_comment}>{dataReceived.landerText.leaveCommentText}</div>
                <textarea name="comment" id="comment" className={styles.commentTextBox}></textarea>
                <input type="button" className={styles.subm_b} style={btnColor} value={dataReceived.landerText.commentButtonText} />
            </div>

                      {dataReceived.landerText.comments.map((item) => {
                        return <div className={styles.comment_row }>
                <div className={styles.inf_user}>
                    <div className={cx(styles.user_img,  styles.com1)}><img src={item.photo} alt='profile'/></div>
                    <div className={styles.name_user}>
                       {item.name}
                        <span className={styles.date_comm}>

           </span>
                    </div>
                    <div className={styles.text_user}>{item.text}</div>
                </div>
            </div>
                      })}
        </div>

    </div>
</div>
</div>

</div>) : null}


          </div>
          <footer>
            <div className={styles.footerDiv}>
              <img
                className={styles.block_logo}
                src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/block_logo.png"
                alt='block logo'
              />
              <br />
              <img
                src="https://firstpushbucket.s3.eu-west-3.amazonaws.com/Amazon+Master+Lander/ssl_sert.png"
                className={styles.secureimg}
                alt='secure'
              />
              <h4>2019 All Rights Reserved.</h4>

              <small className='mt-5'>
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

export default WindowImgBgNew;
