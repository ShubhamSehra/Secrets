import React, { useState } from "react";
import "./styles.css";
import Input from "./Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [info, setInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "/api/user",
        {
          username: info.username,
          email: info.email,
          password: info.password,
        },
        {
          method: "POST",
        }
      )
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="regipage">
      <span>
        {" "}
        Register Yourself 📃
      </span>
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full name"
          name="username"
          change={handleChange}
        />
        <br />
        <Input
          type="email"
          placeholder="Email Id"
          name="email"
          change={handleChange}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          change={handleChange}
        />
        <br />
        <br />
        <button type="submit" className="fill">
          Register
        </button>
        <div className="already " >already registered?... <Link to={'/login'}><strong className="already-sub" >login</strong></Link> </div>
      </form>
    </div>
  );
};

export default Register;
