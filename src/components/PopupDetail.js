import React from 'react';
import PropTypes from 'prop-types';
import LazyImg from './LazyImg';
import wpIntegration from '../helpers/wpIntegration';


class PopupDetail extends React.Component {

	state = {
		isLoading:		false,
		isLoaded: 		false,
		activeMovieId: 	null,
		activeMovie:	null
	}


	isValidValue = value => {
		return ( typeof( value ) === 'string' && value.length && value !== '0' )
	}


	fetchMovieDetailsById = id => {
		this.setState({
			isLoading: 		true,
			isLoaded: 		false,
			activeMovieId: 	id,
			activeMovie: 	null
		});

		// fetch movie details
		wpIntegration
			.getMovie( id )
			.then( movie => {
				this.setState({
					isLoading: 		false,
					isLoaded: 		true,
					activeMovie: 	movie
				});
			});
	}


	showContent = () => {
		if( this.state.activeMovie !== null ) {
			const movie = this.state.activeMovie,
				details = {};

			if( movie.hasOwnProperty( 'director' ) && this.isValidValue( movie.director ) )
				details.Director = movie.director;

			if( movie.hasOwnProperty( 'writer' ) && this.isValidValue( movie.writer ) )
				details.Writer = movie.writer;	
				
			if( movie.hasOwnProperty( 'budget' ) && this.isValidValue( movie.budget ) )
				details.Budget = movie.budget;	
				
			if( movie.hasOwnProperty( 'box_office' ) && this.isValidValue( movie.box_office ) )
				details[ 'Box Office' ] = movie.box_office;	
				
			if( movie.hasOwnProperty( 'website' ) && this.isValidValue( movie.website ) )
				details.Website = movie.website;
			
			return (
				<article className="watched">
					<LazyImg
						classNames="watched__img"
						alt={ movie.title }
						url={ movie.poster }
					/>					
					<h3 className="watched__headline">
						{ movie.title }
						<span className="watched__year">{ movie.year }</span>
					</h3>
					<p className="watched__synopsis">{ movie.content }</p>	
					<div className="watched__deets">
						{ Object.entries( details ).map( item =>
							<div 
								key={ item[0] } 
								className="watched__details"
							>
								<strong className="watched__details__label">{ item[0] }:</strong>
								<span className="watched__details__value">{ item[1] }</span>
							</div>	
						)}
					</div>
				</article>
			)
		}
	}


	handleClose = () => {

		// reset component
		this.setState({
			isLoading: 		false,
			isLoaded: 		false,
			activeMovie: 	null,
			activeMovieId: 	null
		});

		this.props.closePopup();
	}


	componentWillUpdate = props => {
		if( props.activeMovieId !== 0 && props.activeMovieId !== this.state.activeMovieId )
			this.fetchMovieDetailsById( props.activeMovieId );
	}


	render() {
		const classes = [ 'popup' ];

		// are we loading movie?
		if( this.state.isLoading )
			classes.push( 'is-loading' );

		// are we showing the popup?
		if( this.props.isActive )
			classes.push( 'is-active' );

		if( this.state.isLoaded )
			classes.push( 'is-loaded' );

		return (
			<aside className={ classes.join( ' ' ) }>
				<button 
					className="popup__close"
					onClick={ this.handleClose }
				></button>

				{ this.showContent() }
			</aside>
		)
	}

}


PopupDetail.propTypes = {
	isActive: 		PropTypes.bool.isRequired,
	closePopup: 	PropTypes.func.isRequired,
	activeMovieId: 	PropTypes.number.isRequired,
}


export default PopupDetail;