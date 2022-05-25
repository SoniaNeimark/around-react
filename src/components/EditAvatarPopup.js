import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';
import { CurrentInputContext, currentInputs } from '../contexts/CurrentInputContext.js';

function EditAvatarPopup(props) {

	const [inputValue, setInputValue] = React.useState();
	const avatar = React.useRef();

	React.useEffect(() => {
    avatar.current = inputValue;
  });

  function handleSubmit() {
    props.onUpdateAvatar(avatar.current);
  };

	return (
		<PopupWithForm
			buttonText={props.buttonText}
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
		>
      <CurrentInputContext.Provider value={currentInputs.avatar}>
      <FormInput
       setInputValue={setInputValue}
      />
      </CurrentInputContext.Provider>
		</PopupWithForm>
	);
};

export default EditAvatarPopup;

