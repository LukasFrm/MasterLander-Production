import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
// import { MainWindow } from "../src/components/MainWindow";
import { Sorter } from "../src/Sorter";
import { SecondSorter } from "../src/SecondSorter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact path="/:id" component={Sorter} />
          <Route path="/sec/:id" component={SecondSorter} />

        </Router>

        {/* <MainWindow /> */}
      </header>
    </div>
  );
}

export default App;
