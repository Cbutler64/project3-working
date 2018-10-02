import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div className="card" >
    <div className="img-container" onClick={() => props.goToFriend(props.id)}>
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content" onClick={() => props.goToFriend(props.id)} >
      <ul>
        <li>
          <strong>Name:</strong> {props.name}
        </li>
        <li>
          <strong>Real Name:</strong> {props.realname}
        </li>
        <li>
          <strong>Gender:</strong> {props.gender}
        </li>
      </ul>
    </div>
   
  </div>
);

export default FriendCard;
