import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from '../utils/api.js'
import { CurrentUserContext, getCurrentUser } from '../contexts/CurrentUserContext.js';
import { CurrentPropsContext } from '../contexts/CurrentPropsContext.js';
import { CurrentFormContext, currentForms } from '../contexts/CurrentFormContext.js';
import { ComponentsPathsContext} from '../contexts/ComponentsPathsContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import AlertPopup from './AlertPopup.js';

function App() {
  const body = document.querySelector('body')

  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [cardIndex, setCardIndex] = React.useState()
  const [formName, setFormName] = React.useState();
  const navigate = useNavigate();

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [buttonText, setButtonText] = React.useState('Save')
  const componentsPaths = React.useContext(ComponentsPathsContext);

  const currentProps = {
    onClose: closeAllPopups,
    buttonText: buttonText,
    setFormName: setFormName,
    isInvalid: isInvalid,
    onUpdateUser: handleUpdateUser,
  }

  React.useEffect(() => {
    body && body.classList.add('page')
  }, [body])

  React.useEffect(() => {
    api.getUserData()
    .then((data) => {
      setCurrentUser(getCurrentUser(data));
    })
    .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err))
  }, []);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  });

  React.useEffect(() => {
    if (isAddPlacePopupOpen) {
      setButtonText('Create')
    } else {
      setButtonText('Save')
    }
  }, [isAddPlacePopupOpen])

  function resetForm() {
    document.forms[formName].reset();
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    if (formName) {
      resetForm(formName);
    }
    setFormName()
    navigate('/')
  };

  function isInvalid(evt) {
    return !evt.target.validity.valid
  }

  function toggleLike(card, isLiked) {
    if (!isLiked) {
      return api.addLike(card._id);
    } else {
      return api.deleteLike(card._id);
    }
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    toggleLike(card, isLiked)
    .then(newCard => {
      setCards((state) => state.map((currentCard) =>
      currentCard._id === card._id
      ? newCard
      : currentCard));
    })
    .catch(err => console.log(err))
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => {
        return currentCard !== card
      }))
    })
    .catch(err => console.log(err))
  };

  function handleSubmit(updateData, setState) {
    setButtonText(renderLoading(true));
    updateData
    .then((value) => {
      setState(value)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonText(renderLoading(false, buttonText));
    })
  }

  function handleUpdateAvatar(props) {
    handleSubmit(api.editAvatar(props), setCurrentUser)
  }

  function handleUpdateUser(props) {
    handleSubmit(api.editProfile(props), setCurrentUser)
  }

  function handleAddPlaceSubmit(props) {
    handleSubmit(api.addCard(props), updateCards)
  }

  function updateCards(value) {
    setCards([value, ...cards])
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(evt) {
    setIsImagePopupOpen(true);
    setSelectedCard(evt.target);
  };

  function handleDeleteCardClick() {
    setIsAlertPopupOpen(true);
  }

  function renderLoading (isLoading, buttonText) {
    if (isLoading) {
      return "Saving..."
    } else {
      return buttonText
    }
  }

  if (currentUser) {
    return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentPropsContext.Provider value={currentProps}>
        <div className='page__content'>
          <Header />
          <Main
            setIsEditProfilePopupOpen={handleEditProfileClick}
            setIsAddPlacePopupOpen={handleAddPlaceClick}
            setIsEditAvatarPopupOpen={handleEditAvatarClick}
            setIsImagePopupOpen={handleCardClick}
            setIsAlertPopupOpen={handleDeleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            setCardIndex={setCardIndex}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
          <Routes>
            <Route path={componentsPaths.avatar} element={
              <CurrentFormContext.Provider value={currentForms.avatar}>
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </CurrentFormContext.Provider>
              }
            />
            <Route path={componentsPaths.profile} element={
              <CurrentFormContext.Provider value={currentForms.profile}>
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onUpdateUser={handleUpdateUser}
                />
              </CurrentFormContext.Provider>
              }
            />
            <Route path={componentsPaths.add} element={
              <CurrentFormContext.Provider value={currentForms.add}>
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onAddCard={handleAddPlaceSubmit}
                />
              </CurrentFormContext.Provider>
              }
            />
            <Route path={componentsPaths.alert} element={
              <AlertPopup
              key='alert'
              name='alert'
              onClose={closeAllPopups}
              handleCardDelete={handleCardDelete}
              isOpen={isAlertPopupOpen}
              selectedCard={selectedCard}
              />
              }
            />
            <Route path={`${componentsPaths.home}/${cardIndex}`} element={
              <ImagePopup
                isOpen={isImagePopupOpen}
                src={selectedCard.src}
                alt={selectedCard.alt}
              />
              }
            />
          </Routes>
          <Footer />
        </div>
      </CurrentPropsContext.Provider>
    </CurrentUserContext.Provider>
    );
  } else {
    return (
      <h1 className='loading'>Loading...</h1>
    );
  }
};

export default App;
