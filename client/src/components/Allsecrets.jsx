import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Allsecrets() {
  const [alluser, setallUser] = useState({});

  let hvSecrets = [];

  const getallUsers = () => {
    axios
      .get("/userdata")
      .then((alldata) => {
        const res = alldata.data;
        setallUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  for (let i = 0; i < alluser.length; i++) {
    if (alluser[i].secret ) {
      hvSecrets.push(alluser[i]);
    }
  }

  useEffect(getallUsers, []);

  function createCard(props) {
    return <Card secret={props.secret} />;
  }



  
  return (
    <div>
      {hvSecrets.map(createCard)}
    </div>
  );
}

export default Allsecrets;
