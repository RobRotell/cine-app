import React from 'react';
import PropTypes from 'prop-types';


const BtnAdder = props => {

	return (
		<button 
			className="adder"
			onClick={ props.handleAdderClick }
		>
		</button>
	)

}


BtnAdder.propTypes = {
	handleAdderClick: PropTypes.func.isRequired
}


export default BtnAdder;