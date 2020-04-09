import React from 'react';
import PropTypes from 'prop-types';

const Nav = props => {
	const classesBtnToWatch = [ 'nav__btn' ],
		classesBtnWatched = [ 'nav__btn' ];

	if( props.showWatched ) {
		classesBtnWatched.push( 'nav__btn--active' );
	} else {
		classesBtnToWatch.push( 'nav__btn--active' );
	}

	return (
		<nav className="nav">
			<button 
				className={ classesBtnWatched.join( ' ' ) }
				onClick={ props.handleTabClick }
				value="watched"
			>Watched</button>

			<button 
				className={ classesBtnToWatch.join( ' ' ) }
				onClick={ props.handleTabClick }
				value="toWatch"
			>To Watch</button>

			<div className="nav__search">
				<input className="nav__search__input" type="text" />
				<button className="nav__search__btn">
					<i className="icon icon--search">
						<svg version="1.1" viewBox="0 0 512.005 512.005" xmlns="http://www.w3.org/2000/svg">
							<path d="m505.75 475.59l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.32 0-111.74-90.923-202.67-202.67-202.67s-202.67 90.922-202.67 202.67 90.923 202.67 202.67 202.67c48.213 0 92.48-16.981 127.32-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-1e-3 -30.165zm-303.08-112.92c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/>
						</svg>
					</i>
				</button>
			</div>
		</nav>
	)

}


Nav.propTypes = {
	showWatched: PropTypes.bool.isRequired,
	handleTabClick: PropTypes.func.isRequired
}


export default Nav;
