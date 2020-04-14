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


			<button
				className="nav__adder"
				onClick={ props.handleMovieAdd }
			></button>

		</nav>
	)

}


Nav.propTypes = {
	showWatched: PropTypes.bool.isRequired,
	handleTabClick: PropTypes.func.isRequired,
	handleMovieAdd: PropTypes.func.isRequired
}


export default Nav;
