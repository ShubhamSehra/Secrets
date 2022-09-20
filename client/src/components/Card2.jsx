import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Card2(props) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const trashClicked = () => {
    return prompt("No.. you can't delete, It's a prank bro 😂😂 ")
  }

  // const trashClicked = () => {
  //   try {
  //     axios
  //       .post(
  //         "/api/delete",
  //         {
  //           secretIndex: props.secret,
  //           id: userId,
  //         },
  //         {
  //           method: "POST",
  //         }
  //       )
  //       .then(() => navigate(0))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="card-container">
      <div>
        <p>{props.secret}</p>
      </div>
      <div className="trash">
        <button onClick={trashClicked}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default Card2;
