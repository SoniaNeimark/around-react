import React from 'react';
import { CurrentInputContext } from '../contexts/CurrentInputContext';
import { CurrentPropsContext } from '../contexts/CurrentPropsContext';

function FormInput(props) {
  const currentInput = React.useContext(CurrentInputContext)
  const currentProps = React.useContext(CurrentPropsContext)
  const [error, setError] = React.useState()
  const [errorMessage, setErrorMessage] = React.useState()

  function handleChange(evt) {
    props.setInputValue(evt.target.value)
    setError(currentProps.isInvalid(evt))
    setErrorMessage(evt.target.validationMessage)
  }

  return (
  <>
    <input
      className={`popup-box__input${error ? ' popup-box__input_type_error' : ''}`}
      type={currentInput.type}
      id={currentInput.name}
      name={currentInput.name}
      placeholder={currentInput.placeholder}
      onChange={handleChange}
      value={props.value}
      minLength={currentInput.minLength}
      maxLength={currentInput.maxLength}
      required
    />
    <p className={`popup-box__error${error ? ' popup-box__error_visible' : ''}`}>{errorMessage}</p>
  </>

  )
};

export default FormInput
