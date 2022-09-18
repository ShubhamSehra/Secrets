import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setuser] = useState({});
  const [userId, setUserId] = useState();
  const [auth, setAuth ] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  // const google = () => {
  //   window.open("http://localhost:3002/auth/google", "_self");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/login",
          {
            email: user.email,
            password: user.password,
          },
          {
            method: "POST",
          }
        )
        .then((response) => {
          try {
            
            if (response.data) {
              console.log(response.data);
              const id = response.data.result._id;
              localStorage.setItem("user", id);
              setUserId(id);
              navigate(`/secret/${id}`);
            } else {
              console.log("no respo");
            }
          } catch (error) {
            console.log(error);
            setAuth(true)
            console.log("uppr");
          }
        });
    } catch (error) {
      setAuth(true)
      console.log("error in d end");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
      return navigate(`/secret/${localStorage.getItem("user")}`);
    }
  }, [navigate]);

  return (
    <div className="regipage">
      <span>
        {" "}
        <u>Login Here</u>
      </span>
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email Id"
          type="email"
          name="email"
          change={handleChange}
        />
        <br />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          change={handleChange}
        />
        <br />
        <br />
        <button type="submit" className="fill">
          login
        </button>
       {auth ? <h4 className="errorlogin"> user does not exist ❌ </h4> : null}
      </form>

      {/* <button type="submit" className="fill" onClick={google}>
        google
      </button> */}
    </div>
  );
};

export default Login;
