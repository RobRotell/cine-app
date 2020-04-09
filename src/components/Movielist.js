import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import MovieToWatch from './MovieToWatch';

class Movielist extends React.PureComponent {

	render() {
		const classes = [ 'blocks' ];
	
		if( !this.props.display )
			classes.push( 'hide-hard' )
			
		return (
			
			<section className={ classes.join( ' ' ) }>
				{ }
				{ this.props.movies.map( movie => {
					if( movie.to_watch ) {
						return (
							<MovieToWatch
								key={ movie.id }
								id={ movie.id }
								title={ movie.title }
								year={ movie.year }
								director={ movie.director }
								toWatch={ movie.to_watch }
								backdrop={ movie.backdrop }
								handleMovieClick={ () => this.props.handleMovieClick( movie.id ) }
							/>
						)						
					} else {
						return (
							<Movie
								key={ movie.id }
								id={ movie.id }
								title={ movie.title }
								year={ movie.year }
								director={ movie.director }
								toWatch={ movie.to_watch }
								backdrop={ movie.backdrop }
								handleMovieClick={ () => this.props.handleMovieClick( movie.id ) }
							/>
						)
					}
				})}
			</section>
		)
	}
}


Movielist.propTypes = {
	display: 			PropTypes.bool.isRequired,
	handleMovieClick: 	PropTypes.func.isRequired,
	movies: 			PropTypes.array.isRequired
}


export default Movielist;