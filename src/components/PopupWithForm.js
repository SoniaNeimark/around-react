import React from 'react';
import { CurrentFormContext } from '../contexts/CurrentFormContext';
import { CurrentPropsContext } from '../contexts/CurrentPropsContext';

function PopupWithForm(props) {
  const [buttonOff, setButtonOff] = React.useState(true)
  const currentForm = React.useContext(CurrentFormContext)
  const currentProps = React.useContext(CurrentPropsContext)
  const formName = React.useRef()
  React.useEffect(() => {
    formName.current = currentForm.name
  })
  React.useEffect(() => {
    currentProps.setFormName(formName.current)
  })

  function isInvalid(el) {
    return !el.validity.valid
  }

  function onChange() {
    const inputs = Array.from(document
      .forms[currentForm.name]
      .querySelectorAll('input'))
    if (inputs.some(isInvalid)) {
      setButtonOff(true)
    } else {
      setButtonOff(false)
    }
  }

  function onClose() {
    setButtonOff(true)
    currentProps.onClose()
   }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(evt)
    onClose();
  }

  return (
    <div
      key={currentForm.name}
      className={`popup-box popup-box_${currentForm.name}${props.isOpen ? ' popup-box_opened' : ''}`}
      id={`${currentForm.name}popup`}
      onClick={(evt) => {
        if (evt.currentTarget === evt.target) {
          onClose();
        }
      }}
    >
      <div className='popup-box__container'>
        <form
          className={`popup-box__form popup-box__form_${currentForm.name}`}
          name={currentForm.name} id={currentForm.name} onChange={() => {
            onChange()
          }}
          onSubmit={(evt) => handleSubmit(evt)}
        >
          <div className='popup-box__heading'>
            <h2 className='popup-box__title'>{currentForm.title}</h2>
            <button
              className={`close-button close-button_${currentForm.name} hover-opacity`}
              type='button'
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <fieldset className='popup-box__fieldset'>
            {props.children}
            <button
              className={`popup-box__button popup-box__button_${currentForm.name}${buttonOff ? ' popup-box__button_disabled' : ''}`}
              type='submit' disabled={buttonOff}>
              {currentProps.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
