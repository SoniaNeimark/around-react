import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentInputContext, currentInputs } from '../contexts/CurrentInputContext.js';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit() {
    props.onUpdateUser({ name: name, about: description });
  };

	return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <CurrentInputContext.Provider value={currentInputs.profileName}>
        <FormInput
          value={name}
          setInputValue={setName}
        />
      </CurrentInputContext.Provider>
      <CurrentInputContext.Provider value={currentInputs.profileAbout}>
        <FormInput
          value={description}
          setInputValue={setDescription}
        />
      </CurrentInputContext.Provider>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
