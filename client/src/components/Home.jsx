import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("user")) {
     
      return navigate(`/secret/${localStorage.getItem("user")}`)
  } 
  },[navigate])
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faKey} size="5x" />
        <span className="mainTitle">Share Secrets</span>
        <span className="subTitle">
          It's time to share your secrets, anonymously!
        </span>

        <hr
          style={{
            background: "white",
            height: "0.02rem",
            width: "70%",
            
          }}
        />
        <div className="flex">
          <Link type="button" to={"/register"} className="fill">
            Register
          </Link>
          <Link type="button" to={"/login"} className="fill">
            login
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;
