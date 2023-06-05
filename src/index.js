import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

function App() {
  fetch("/user").then((res) => {
    console.log(1111, res);
  });

  return (
    <div className="home">
      <div className="test">test</div>
      <img src="../assets/imgs/react.png" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
