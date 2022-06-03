import React from "react";
function Card(props) {
  return (
    <li className="elements__card">
      <img
        className="elements__image hover-opacity open-popup"
        onClick={props.onClick}
        src={props.src}
        alt={props.title}
      />
      <h2 className="elements__title">{props.title}</h2>
      <div className="elements__like-group">
        <button className="like-button" type="button"></button>
        <p className="elements__like-number">{props.likes.length}</p>
      </div>
      <button className="delete-button hover-opacity" type="button"></button>
    </li>
  );
}
export default Card;
