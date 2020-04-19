import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';


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
		if( this.props.isSearching ) {
			return (
				<div className="popup__results__searching"></div>
			)
		} else {
			if( this.props.addResults.length === 0 ) {
				return (
					<p className="popup__results__no-results">No matches found.</p>
				);
			} else {
				return (
					<section className="popup__results__results">
						{ this.props.addResults.map( item =>
							<Result 
								key={ item.id }
								id={ item.id }
								title={ item.title }
								content={ item.description }
								year={ item.year } 
								poster={ item.poster }
								status={ item.status }
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
		if( value.length >= 3 ) {
			self.searchTimeout = setTimeout( () => {
				self.props.handleAddInput( value );
			}, 500 );
		}
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
	isSearching: 		PropTypes.bool.isRequired,
	addResults: 		PropTypes.array.isRequired,
	closeAdder: 		PropTypes.func.isRequired,
	handleAddClick: 	PropTypes.func.isRequired,
	handleAddInput: 	PropTypes.func.isRequired,
}


export default PopupAdder;