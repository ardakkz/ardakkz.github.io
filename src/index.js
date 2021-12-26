import React, { Component } from "react";
import { render } from "react-dom";
import Blockchain from "./components/Blockchain";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Blockchain />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
