import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';
import { CurrentInputContext, currentInputs } from '../contexts/CurrentInputContext.js';

function AddPlacePopup(props) {
	const [cardTitle, setCardTitle] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardTitle(cardTitle);
    setCardLink(cardLink);
  }, [cardTitle, cardLink]);

  function handleSubmit() {
		props.onAddCard({ name: cardTitle, link: cardLink });
	};

  function onTitleChange(evt) {
    setCardTitle(evt.target.value)
  }

  function onLinkChange(evt) {
    setCardLink(evt.target.value)
  }

	return (
		<PopupWithForm
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
		>
      <CurrentInputContext.Provider value={currentInputs.addTitle}>
        <FormInput
          onChange={onTitleChange}
          setInputValue={setCardTitle}
        />
      </CurrentInputContext.Provider>
      <CurrentInputContext.Provider value={currentInputs.addUrl}>
        <FormInput
          onChange={onLinkChange}
          setInputValue={setCardLink}
        />
      </CurrentInputContext.Provider>
		</PopupWithForm>
	)
};

export default AddPlacePopup;
