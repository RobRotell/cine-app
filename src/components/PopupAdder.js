import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';
import wpIntegration from '../helpers/wpIntegration';


class PopupAdder extends React.Component {

	state = {
		isSearching: 		false,
		searchTimeout: 		null,
		matches: 			[]
	}


	// when popup opens, automatically "tab into" input field
	componentDidUpdate = () => {
		if( this.props.isActive === true )
			document.querySelector( '#adder-input' ).focus();
	}


	showResults = () => {
		const el = document.querySelector( '#adder-input' );

		// if no current query, don't show anything
		if( el === null || el.value === '' )
			return;

		// what should show in results panel?
		if( this.state.isSearching ) {
			return (
				<div className="popup__results__searching"></div>
			)
		} else {
			if( this.state.matches.length === 0 ) {
				return (
					<p className="popup__results__no-results">No matches found.</p>
				);
			} else {
				return (
					<section className="popup__results__results">
						{ this.state.matches.map( item =>
							<Result 
								key={ item.id }
								id={ item.id }
								title={ item.title }
								content={ item.description }
								year={ item.year } 
								poster={ item.poster }
								handleAddClick={ this.props.handleAddClick }
							/>
						)}
					</section>
				)
			}
		}
	}


	handleInputChange = e => {
		const self = this,
			value = e.currentTarget.value;

		// clear previous timeout (if within half second)
		clearTimeout( self.searchTimeout );
		if( value.length > 3 ) {
			self.searchTimeout = setTimeout( () => {

				// for loading animation
				this.setState({
					isSearching: true
				});

				// fetch matches from endpoint
				self.getMatchesFromWp( value );
			}, 500 );
		}
	}


	getMatchesFromWp = value => {
		const self = this;

		wpIntegration
			.searchByTitle( value )
			.then( matches => {
				self.setState({
					isSearching: 	false,
					matches: 		matches
				})
			});
	}

 
	render() {
		let classes = [ 'popup' ];
		if( this.props.isActive === true )
			classes.push( 'is-active' );	

		return (
			<aside className={ classes.join( ' ' ) }>
				<button 
					className="popup__close"
					onClick={ this.props.closeAdder }
				></button>

				<div className="popup__form">
					<input
						id="adder-input"
						className="popup__form__input"
						onChange={ this.handleInputChange }
						placeholder="Search by movie title &hellip;"
					/>
				</div>

				<div className="popup__results">
					{ this.showResults() }
				</div>

			</aside>
		)
	}

}


PopupAdder.propTypes = {
	isActive: 			PropTypes.bool.isRequired,
	closeAdder: 		PropTypes.func.isRequired,
	handleAddClick: 	PropTypes.func.isRequired
}


export default PopupAdder;