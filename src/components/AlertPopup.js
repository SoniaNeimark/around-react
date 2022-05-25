import React from 'react';
function AlertPopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleCardDelete(props.selectedCard)
    props.onClose();
  }
  return (
    <div
      key={props.name}
      className={`popup-box popup-box_alert${props.isOpen ? ' popup-box_opened' : ''}`}
      id={props.name}
      onClick={(evt) => {
        if (evt.currentTarget === evt.target) {
          props.onClose();
        }
      }}
    >
      <div className='popup-box__container'>
        <form
          className={`popup-box__form popup-box__form_${props.name}`}
          name={props.name} id={props.name}
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <div className='popup-box__heading'>
            <h2 className='popup-box__title'>Are you sure?</h2>
            <button
              className={`close-button close-button_${props.name} hover-opacity`}
              type='button'
              onClick={() => {
                props.onClose();
              }}
            ></button>
          </div>
          <button
            className={`popup-box__button popup-box__button_${props.name}`}
            type='submit'>
              Yes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AlertPopup;
