import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ComponentsPathsContext } from '../contexts/ComponentsPathsContext.js';
import { Link } from 'react-router-dom';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const componentsPaths = React.useContext(ComponentsPathsContext)

  function handleImageClick(evt) {
    props.setIsImagePopupOpen(evt)
  }

  function handleCardDelete(card) {
    props.setSelectedCard(card)
    props.setIsAlertPopupOpen()
  }

  return (
    <main className='main-content'>
      <section className='profile'>
        <div
          className='profile__image'
          id='profile'
          style={{ backgroundImage: `url(${currentUser.avatar})` }}>
        </div>
        <div className='profile__avatar-edit'>
          <Link to={componentsPaths.avatar}>
            <button
              className='avatar-edit-button hover-opacity open-popup'
              type='button'
              onClick={() => props.setIsEditAvatarPopupOpen()}>
            </button>
          </Link>
        </div>
        <div className='profile__info'>
          <div className='profile__title'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <Link to={componentsPaths.profile}>
            <button
              className='edit-button hover-opacity open-popup'
              type='button'
              onClick={() => props.setIsEditProfilePopupOpen()}>

            </button>
            </Link>
          </div>
          <p className='profile__profession'>{currentUser.about}</p>
        </div>
        <div className='profile__add-button-wrapper'>
        <Link to={componentsPaths.add}>
          <button
            className='profile__add-button hover-opacity open-popup'
            type='button'
            onClick={() => props.setIsAddPlacePopupOpen()}>
          </button>
        </Link>
        </div>
      </section>

      <section className='elements'>
        <ul className='elements__cards' id='cards'>
          {props.cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              src={card.link}
              title={card.name}
              likes={card.likes}
              onClick={handleImageClick}
              owner={card.owner}
              onCardLike={() => {props.onCardLike(card)}}
              onCardDelete={() => {handleCardDelete(card)}}
              openCardImage={props.openCardImage}
              setCardIndex={props.setCardIndex}
            />
            ))
          }
        </ul>
      </section>

    </main>
  );
};

export default Main;
