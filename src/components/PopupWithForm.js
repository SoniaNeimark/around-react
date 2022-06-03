import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`popup-box popup-box_${props.name}
				${props.isOpen ? " popup-box_opened" : ""}`}
      id={props.name}
      onClick={(evt) => {
        if (evt.currentTarget === evt.target) {
          props.onClose();
        }
      }}>
      <div className="popup-box__container">
        <form
          className={`popup-box__form popup-box__form_${props.name}`}
          name={props.name}>
          <div className="popup-box__heading">
            <h2 className="popup-box__title">{props.title}</h2>
            <button
              className={`close-button close-button_${props.name} hover-opacity`}
              type="button"
              onClick={() => props.onClose()}
            ></button>
          </div>
          <fieldset className="popup-box__fieldset">
            {props.children}
            <button
              className={`popup-box__button popup-box__button_${props.name}`}
              type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
