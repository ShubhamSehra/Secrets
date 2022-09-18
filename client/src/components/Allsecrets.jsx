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
  
  


  for (let i = 0; i < alluser.length ; i++) {
    for(let j = 0; j < alluser[i].secret.length; j++ )
    
      hvSecrets.push(alluser[i].secret[j]);
    
  }
 
  useEffect(getallUsers, []);


  return (
    <div>
      {hvSecrets.map((card,i)=>{
        return <Card secret={card} />
      })}
    </div>
  );
}

export default Allsecrets;
