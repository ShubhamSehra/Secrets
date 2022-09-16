import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Submit from "./Submit";
import axios from "axios";
// import Card from "./Card";
import Allsecrets from "./Allsecrets";
import Footer from "./Footer";

const Secret = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getUser = () => {
    axios
      .get("/userdata")
      .then((alldata) => {
        const res = alldata.data.find((found) => found._id === userId);

        setUser(res);

        // filter from backend
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getUser, [userId]);

  if (!localStorage.getItem("user")) {
    return navigate("/login");
  }
  // console.log(user);
  return (
    <div>
      <Navbar username={user.username} />

      <div className="secretPage">
        <span className="title1">
          welcome{" "}
          <p className="subtitle">
            to the 🌎 of secrets🔑
            <p className="infoline">within 73 words</p>
          </p>
        </span>
        <div>
          <Submit />
        </div>
        <div style={{ margin: "20px 0px" }}>
          <span style={{ backgroundColor: "black", display: "block" }}>
            All Secrets
          </span>
        </div>

        <div>
          <Allsecrets />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Secret;
