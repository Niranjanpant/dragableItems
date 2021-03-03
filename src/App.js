import React from "react";
import Drag from "./components/drag";

import "./App.css";
// import image from "./image/bacimage.jpg";

const data = [
  { title: "group1", items: ["1", "2", "3"] },
  { title: "group2", items: ["4", "5"] },
];
function App() {
  return (
    <div
      className="App"
      // style={{
      //   backgroundImage: `url(${image})`,
      //   backgroundRepeat: "no-repeat",
      //   width: "100vw",
      //   height: "100vh",
      //   backgroundSize: "cover",
      // }}
    >
      <div className="App-header">
        <Drag data={data} />
{        console.log("ndsbkfbask")}
      </div>
    </div>
  );
}

export default App;
