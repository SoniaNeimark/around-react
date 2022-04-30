function Header() {
	return (	
	<header className="header">
		<div className="logo" id="logo" onClick={() => {
			console.log(document.querySelector(".elements__cards"))
		}}></div>
	</header>	
	);
}

export default Header;