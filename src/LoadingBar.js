import React, { Component } from "react";
import ErrorPage from './ErrorPage'

class LoadingBar extends Component {
  render() {
    return (
      <div>
        {this.props.error ? (
          <ErrorPage />
        ) : (
          <div
            className="loadingBar text-center"
            style={{
              width: "100%",
              height: "100%",
              paddingBottom: "75%",
              position: "relative"
            }}
          >
            <img
              src="https://i.gifer.com/4V0b.gif"
              className="mt-5 mx-auto"
              alt="Loading Bar"
            />
          </div>
        )}
      </div>
    );
  }
}

export default LoadingBar;
