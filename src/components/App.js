import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';

function App() {

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
	
  function handleEditProfileClick() {    
    setIsEditProfilePopupOpen(true)
  } 
	
  function handleAddPlaceClick() {    
    setIsAddPlacePopupOpen(true)
  }  

  function handleEditAvatarClick() {    
    setIsEditAvatarPopupOpen(true)
  }
  function handleCardClick(evt) {
    setIsImagePopupOpen(true)
    setSelectedCard(evt.target)
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)

  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  return (
    <>
      <div className='page__content'>
        <Header/>
        <Main
          setIsEditProfilePopupOpen={handleEditProfileClick} 
          setIsAddPlacePopupOpen={handleAddPlaceClick}
          setIsEditAvatarPopupOpen={handleEditAvatarClick}
          setIsImagePopupOpen={handleCardClick}
        />
        <Footer />
      </div>
      
      <PopupWithForm Profile 
        key='profile' 
        name='profile' 
        title ='Edit profile' 
        buttonText='Save' 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
          <input 
            className='popup-box__input popup-box__input_type_name' 
            type='text' 
            id='name' 
            name='name' 
            placeholder='Name' 
            minLength='2' 
            maxLength='40' 
            required
          />
          <p className='popup-box__error popup-box__error_name'></p>
          <input 
            className='popup-box__input popup-box__input_type_job' 
            type='text'  
            id='about' 
            name='about' 
            placeholder='About me' 
            minLength='2' 
            maxLength='200' 
            required
          />
          <p className='popup-box__error popup-box__error_about'></p>
      </PopupWithForm>

      <PopupWithForm Place 
        key='add' 
        name='add' 
        title ='New place' 
        buttonText='Create' 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}>
          <input 
            className='popup-box__input popup-box__input_type_title' 
            type='text'  
            id='title' 
            name='title' 
            placeholder='Title' 
            required minLength='1' 
            maxLength='30'
          />
          <p className='popup-box__error popup-box__error_title'></p>
          <input 
            className='popup-box__input popup-box__input_type_link' 
            type='url' 
            id='url' 
            name='url' 
            placeholder='Image link' 
            required
          />
          <p className='popup-box__error popup-box__error_url'></p>
      </PopupWithForm>

      <PopupWithForm Avatar 
        key='avatar' 
        name='avatar' 
        title ='Change profile picture' 
        buttonText='Create' 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}>
          <input 
            className='popup-box__input popup-box__input_type_avatarUrl' 
            type='url' 
            id='avatarUrl' 
            name='avatarUrl' 
            placeholder='Image link' 
            required
          />
          <p className='popup-box__error popup-box__error_avatarUrl'></p>
      </PopupWithForm>

      <ImagePopup 
        isOpen={isImagePopupOpen} 
        src={selectedCard.src} 
        alt={selectedCard.alt} 
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;