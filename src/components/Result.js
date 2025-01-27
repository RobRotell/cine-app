import React from 'react';
import PropTypes from 'prop-types';
import LazyImg from './LazyImg';


class Result extends React.Component {

	state = {
		isLoading: false
	};


	addMovie = e => {
		const el = e.currentTarget,
			action = el.value;

		// add loading state
		this.setState({ isLoading: true });

		// do action
		this.props.handleAddClick( this.props.id, action );
	}

	renderMoviePoster = () => {
		if( this.props.poster !== null ) {
			return (
				<LazyImg
					classNames="result__img"
					alt={ this.props.title }
					url={ this.props.poster }
				/>
			) 
		} else {
			return (
				<span className="result__img result__img--missing"></span>
			)
		}
	}


	maybeShowButtons = () => {
		let classesToWatch = [ 'result__btn' ],
			classesWatched = [ 'result__btn' ],
			disabledToWatch = false,
			disabledWatched = false;

		if( this.props.status !== null ) {
			if( this.props.status === 'to_watch' ) {
				disabledToWatch = true;
				classesToWatch.push( 'result__btn--disabled' );
				classesWatched.push( 'result__btn--active' );
			} else if( this.props.status === 'watched' ) {
				disabledToWatch = true;
				disabledWatched = true;
				classesToWatch.push( 'result__btn--disabled' );
				classesWatched.push( 'result__btn--disabled' );
			}
		}

		return (
			<div className="result__btns">
				<button 
					className={ classesToWatch.join( ' ' ) }
					onClick={ this.addMovie }
					value="toWatch"
					title="I want to watch this movie"
					disabled={ disabledToWatch }
				>
					<i className="result__btn__icon">
						<svg version="1.1" viewBox="0 0 512.005 512.005" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M448.18,80h-320c-17.673,0-32,14.327-32,32s14.327,32,32,32h320c17.673,0,32-14.327,32-32S465.853,80,448.18,80z"/></g></g><g><g><path d="M64.18,112c-0.036-8.473-3.431-16.586-9.44-22.56c-12.481-12.407-32.639-12.407-45.12,0 C3.61,95.414,0.215,103.527,0.18,112c-0.239,2.073-0.239,4.167,0,6.24c0.362,2.085,0.952,4.124,1.76,6.08 c0.859,1.895,1.876,3.715,3.04,5.44c1.149,1.794,2.49,3.457,4,4.96c1.456,1.45,3.065,2.738,4.8,3.84 c1.685,1.227,3.512,2.248,5.44,3.04c2.121,1.1,4.382,1.908,6.72,2.4c2.073,0.232,4.167,0.232,6.24,0 c8.45,0.007,16.56-3.329,22.56-9.28c1.51-1.503,2.851-3.166,4-4.96c1.164-1.725,2.181-3.545,3.04-5.44 c1.021-1.932,1.826-3.971,2.4-6.08C64.419,116.167,64.419,114.073,64.18,112z"/></g></g><g><g><path d="M64.18,256c0.238-2.073,0.238-4.167,0-6.24c-0.553-2.065-1.359-4.053-2.4-5.92c-0.824-1.963-1.843-3.839-3.04-5.6 c-1.109-1.774-2.455-3.389-4-4.8c-12.481-12.407-32.639-12.407-45.12,0C3.61,239.414,0.215,247.527,0.18,256 c0.062,4.217,0.875,8.388,2.4,12.32c0.802,1.893,1.766,3.713,2.88,5.44c1.217,1.739,2.611,3.348,4.16,4.8 c1.414,1.542,3.028,2.888,4.8,4c1.685,1.228,3.511,2.249,5.44,3.04c1.951,0.821,3.992,1.412,6.08,1.76 c2.047,0.459,4.142,0.674,6.24,0.64c2.073,0.239,4.167,0.239,6.24,0c2.036-0.349,4.024-0.94,5.92-1.76 c1.981-0.786,3.861-1.807,5.6-3.04c1.772-1.112,3.386-2.458,4.8-4c1.542-1.414,2.888-3.028,4-4.8c1.23-1.684,2.251-3.51,3.04-5.44 c1.093-2.124,1.9-4.384,2.4-6.72C64.426,260.167,64.426,258.073,64.18,256z"/></g></g><g><g><path d="M64.18,400c0.237-2.073,0.237-4.167,0-6.24c-0.553-2.116-1.359-4.157-2.4-6.08c-0.859-1.895-1.876-3.715-3.04-5.44 c-1.112-1.772-2.458-3.386-4-4.8c-12.481-12.407-32.639-12.407-45.12,0c-1.542,1.414-2.888,3.028-4,4.8 c-1.164,1.725-2.181,3.545-3.04,5.44c-0.83,1.948-1.421,3.99-1.76,6.08c-0.451,2.049-0.665,4.142-0.64,6.24 c0.036,8.473,3.431,16.586,9.44,22.56c1.414,1.542,3.028,2.888,4.8,4c1.685,1.228,3.511,2.249,5.44,3.04 c1.951,0.821,3.992,1.412,6.08,1.76c2.047,0.459,4.142,0.674,6.24,0.64c2.073,0.239,4.167,0.239,6.24,0 c2.036-0.349,4.024-0.94,5.92-1.76c1.981-0.786,3.861-1.807,5.6-3.04c1.772-1.112,3.386-2.458,4.8-4 c1.542-1.414,2.888-3.028,4-4.8c1.231-1.683,2.252-3.51,3.04-5.44c1.092-2.125,1.899-4.384,2.4-6.72 C64.426,404.167,64.426,402.073,64.18,400z"/></g></g><g><g><path d="M480.18,224h-352c-17.673,0-32,14.327-32,32s14.327,32,32,32h352c17.673,0,32-14.327,32-32S497.853,224,480.18,224z"/></g></g><g><g><path d="M336.18,368h-208c-17.673,0-32,14.327-32,32c0,17.673,14.327,32,32,32h208c17.673,0,32-14.327,32-32 C368.18,382.327,353.853,368,336.18,368z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
					</i>
				</button>
				<button 
					className={ classesWatched.join( ' ' ) }
					onClick={ this.addMovie }
					value="watched"
					title="I watched this movie"
					disabled={ disabledWatched }
				>
					<i className="result__btn__icon">
						<svg viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
					</i>
				</button>					
			</div>				
		)
	}

 
	render() {
		const classes = [ 'result' ];

		if( this.state.isLoading )
			classes.push( 'is-loading' );

		return (
			<article className={ classes.join( ' ' ) }>
				{ this.renderMoviePoster() }
				<div className="result__content">
					<h4 className="result__title">{ this.props.title }
						<span className="result__year">{ this.props.year }</span>
					</h4>
					<p className="result__desc">{ this.props.content }</p>
					{ this.maybeShowButtons() }
				</div>
			</article>
		)
	}

}


Result.propTypes = {
	id: 			PropTypes.number.isRequired,
	handleAddClick:	PropTypes.func.isRequired,
	title: 			PropTypes.string.isRequired,
	content: 		PropTypes.string.isRequired,
	year: 			PropTypes.string.isRequired,
	poster: 		PropTypes.string,
	status: 		PropTypes.string
}


export default Result;