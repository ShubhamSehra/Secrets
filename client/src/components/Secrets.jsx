import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Submit from "./Submit";
import axios from "axios";
import Allsecrets from "./Allsecrets";
import Footer from "./Footer";
import Mysecrets from "./Mysecrets";

const Secret = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [allshow, setAllShow] = useState(true);
  const [myshow, setMyShow] = useState(false);
  const navigate = useNavigate();

  const allsecrets = () => {
    setAllShow(true);
    setMyShow(false);
  };

  const mysecrets = () => {
    setMyShow(true);
    setAllShow(false);
  };
  // const id = localStorage.getItem("user")

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
          <button className="special-btn" onClick={allsecrets}>
            All Secrets
          </button>

          <button className="special-btn" onClick={mysecrets}>
            My Secrets
          </button>
        </div>

        <div>{allshow ? <Allsecrets /> : null}</div>
        <div>{myshow ? <Mysecrets /> : null}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Secret;
