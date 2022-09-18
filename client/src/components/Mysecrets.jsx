import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from "./Card";
import Card2 from "./Card2";

function Mysecrets() {
  const [user, setUser] = useState({});

  const id = localStorage.getItem("user");

  const getUsers = () => {
    axios
      .get("/userdata")
      .then((alldata) => {
        const res = alldata.data.find((found) => found._id === id);
        setUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  useEffect(getUsers, [id]);

  return (
    <div>
      
      { user.secret?.map((item, i) => {
        return <Card2 secret={item} />
      })}
     
    </div>
  );
}

export default Mysecrets;
