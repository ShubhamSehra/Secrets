import React, {  useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Input from "./Input";

function Submit() {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

     axios
      .post(
        "/api/postSecret",
        {
          secret: info.secret,
          id: userId,
        },
        {
          method: "POST",
        }
      )
      .then(() => {
        navigate("/");
      })
  };

  

  return (

      
    
    <div>
      <form className="submit" onSubmit={handleSubmit}>
        <Input
          placeholder={"What's your secret?"}
          type="text"
          name="secret"
          change={handleChange}
          length= "120"
        />
        <button type="submit" className="fill">
          Share🔑
        </button>
      </form>
    </div>
  )
}

export default Submit;
