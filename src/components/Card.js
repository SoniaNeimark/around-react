import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ComponentsPathsContext } from '../contexts/ComponentsPathsContext.js';
import { Link } from 'react-router-dom';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const componentsPaths = React.useContext(ComponentsPathsContext)
  const isLiked = props.likes.some(user => checkIfOwner(user));
  const isOwn = checkIfOwner(props.owner);

  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  };

  function handleImageClick(evt) {
    props.setCardIndex(props.id)
    props.onClick(evt)
  }

  function handleCardDelete() {
    props.onCardDelete()
  }

  return (
    <li className='elements__card'>
      <div className='elements__image-wrapper'>
        <Link to={`${componentsPaths.home}${props.id}`}>
          <img
            className='elements__image hover-opacity open-popup'
            onClick={handleImageClick}
            src={props.src}
            alt={props.title}
          />
        </Link>
      </div>
      <h2 className='elements__title'>{props.title}</h2>
      <div className='elements__like-group'>
        <button
          className={`like-button${isLiked ? ' like-button_status_active' : ''}`}
          type='button'
          onClick={props.onCardLike}>
        </button>
        <p className='elements__like-number'>{props.likes.length}</p>
      </div>
      <Link to={componentsPaths.alert}>
      <button
        className={`delete-button hover-opacity${isOwn ? ' delete-button_visible' : ''}`}
        type='button'
        onClick={(evt) => {handleCardDelete(evt)}}>
      </button>
      </Link>
    </li>
  );
};

export default Card;
