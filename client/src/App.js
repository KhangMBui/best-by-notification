import React, { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";

function App() {
  // const [data, setData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     });
  // }, []);
  return (
    // <div>
    //   {typeof data.members === "undefined" ? (
    //     <p>Fetching the API</p>
    //   ) : (
    //     data.members.map((member, i) => <p key={i}>{member}</p>)
    //   )}
    // </div>
    <div>
      <Welcome />
    </div>
  );
}

export default App;
