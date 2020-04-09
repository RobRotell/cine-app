import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

const Movielist = props => {

	const classes = [ 'blocks' ];

	if( !props.display )
		classes.push( 'hide-hard' )

		
	return (
		
		<section className={ classes.join( ' ' ) }>
			{ props.movies.map( movie =>
				<Movie
					key={ movie.id }
					id={ movie.id }
					title={ movie.title }
					year={ movie.year }
					website={ movie.website }
					director={ movie.director }
					toWatch={ movie.to_watch }
					backdrop={ movie.backdrop }
					handleMovieClick={ () => props.handleMovieClick( movie.id ) }
				/>
			)}
		</section>
	)

}


Movielist.propTypes = {
	display: PropTypes.bool.isRequired,
	movies: PropTypes.array.isRequired,
	handleMovieClick: PropTypes.func.isRequired
}


export default Movielist;