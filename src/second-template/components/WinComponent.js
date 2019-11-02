import React, { Component } from "react";
import styles from "../secondLander.module.css";

class WinComponent extends Component {
  render() {
    var { btnStyle, dataReceived, likesArray, referer } = this.props;

    return (
      <div id="maincnt" className={styles.maincnt}>
        <h2 className="font-size-20  text-center pt-0">
          {dataReceived.text.completedSurveyP1Text}
        </h2>
        <p className="font-size-18 mt-0 mb-0">
          {dataReceived.text.completedSurveyP2Text}
        </p>
        <p className="font-size-18 mt-0 mb-3">
          {dataReceived.text.offerPriceText}
        </p>
        <p className="text-center font-size-18 font-weight-bold mb-2">
          {dataReceived.text.offerTodayPriceText}
        </p>
        <img
          src={dataReceived.offer.item.pictureUrl}
          className={styles.offer_img_size}
          onClick={referer}
          alt='offer'
        />
        <button
          type="button"
          onClick={referer}
          className="btn btn-primary w-100 mt-3"
          style={btnStyle}
        >
          {dataReceived.text.orderShippingText}
        </button>
        <p className="font-size-14 mt-3 mb-3 text-center">
          {dataReceived.text.orderQuantityLeftText}
        </p>
        <div>
          <p className={styles.commentsHeader}>
            {dataReceived.text.antiSpamText}
          </p>

          {dataReceived.text.comments.map((item, index) => {
            return (
              <div className="row m-0" key={index}>
                <div className={styles.commentDiv}>
                  <img src={item.photo} className={styles.commentPhoto} alt='profile'/>
                  <p className={styles.commentName}>{item.name}</p>
                  <p className={styles.commentText}>{item.text}</p>
                  <p className={styles.likesText}>
                    {dataReceived.text.surveyExperienceText} |{" "}
                    {likesArray[index]} Likes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WinComponent;
