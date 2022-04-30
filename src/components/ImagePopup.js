function ImagePopup(props) {
	return (
		<div className={`popup-box popup-box_image popup-box_no-form${props.isOpen ? ' popup-box_opened' : ''}`} 
		id="image"
		onClick={(evt) => {if (evt.currentTarget === evt.target) {props.onClose()}}}>
		<div className="popup-box__wrapper">
			<button className="close-button hover-opacity close-button_place_image" type="button" onClick={() => props.onClose()}></button>
			<img className="popup-box__image" src={props.src} alt={props.alt}/>
			<p className="popup-box__subtitle">{props.alt}</p>
		</div>
	</div>
	);
}
export default ImagePopup;