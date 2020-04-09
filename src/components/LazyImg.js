import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'vanilla-lazyload';


if( !document.lazyLoadInstance ) {
	document.lazyLoadInstance = new LazyLoad({
		elements_selector: 	'.lazy',
		once: 				true,
		load_delay: 		250,
	});
}


class LazyImg extends React.Component {

	componentDidMount = () => {
		document.lazyLoadInstance.update();
	}

	componentDidUpdate = () => {
		document.lazyLoadInstance.update();
	}	


	parseClasses = arg => {
		let classNames = [];

		if( Array.isArray( arg ) ) {
			classNames = arg;
		} else if( typeof( arg ) === 'string' ) {
			classNames = arg.split( ' ' );
		}

		if( !classNames.includes( 'lazy' ) )
			classNames.push( 'lazy' );
			
		return classNames;
	}


	render() {
		let classes = this.parseClasses( this.props.classNames );

		return(
			<img 
				className={ classes.join( ' ' ) }
				alt={ this.props.alt }
				data-src={ this.props.url } 
			/>
		)
	}

}


LazyImg.propTypes = {
	classNames:	PropTypes.string,
	alt: 		PropTypes.string.isRequired,
	url: 		PropTypes.string.isRequired,
}


export default LazyImg;