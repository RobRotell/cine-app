import React from 'react';
import PropTypes from 'prop-types';


const BtnAdder = props => {

	return (
		<button 
			className="adder"
			onClick={ props.handleBtnAdderClick }
		>
		</button>
	)

}


BtnAdder.propTypes = {
	handleBtnAdderClick: PropTypes.func.isRequired
}


export default BtnAdder;