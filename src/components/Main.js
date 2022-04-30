import { api } from "../utils/api.js";
import React from "react";
import Card from "./Card.js";

function Main(props) {
	const [userInfo, getUserInfo] = React.useState({});
	const [cards, getCards] = React.useState([]);

	function setProfile(callBack) {
		callBack
		.then(data => {
			getUserInfo(data)
		})
	}

	function setCards(callBack) {
		callBack
		.then(data => {
			getCards(data)
		})		
	}
	React.useEffect(() => {
		setProfile(api.getUserData())
	}, [])

	React.useEffect(() => {
		setCards(api.getInitialCards())
	}, [])

	return (
		<main className="main-content">
			<section className="profile">
				<div className="profile__image" id="profile" style={{backgroundImage: `url(${userInfo.avatar})`}}></div>
				<div className="profile__avatar-edit">
					<button className="avatar-edit-button hover-opacity open-popup" type="button" onClick={() => props.onEditAvatarClick()}></button>
				</div>
				<div className="profile__info">
					<div className="profile__title">
						<h1 className="profile__name">{userInfo.name}</h1>
						<button className="edit-button hover-opacity open-popup" type="button" onClick={() => props.onEditProfileClick()}></button>
					</div>
					<p className="profile__profession">{userInfo.about}</p>
				</div>
				<button className="add-button hover-opacity open-popup" type="button" onClick={() => props.onAddPlaceClick()}></button>
			</section>

			<section className="elements">
				<ul className="elements__cards" id="cards">
					{cards.map(card => <Card key={card._id} src={card.link} title={card.name} onClick={(evt) => props.onCardClick(evt)} />)}
				</ul>
			</section>
    </main>
	);

}

export default Main;