import React from 'react';
import PropTypes from 'prop-types';
import LazyImg from './LazyImg';


const Movie = props => {

	const handleMouseEnter = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title'),
			shift = el.querySelector('.block__extra').offsetHeight;

		title.style.transform = `translate3d( 0, -${shift}px, 0 )`;
	}

	const handleMouseLeave = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title');

		title.style.transform = 'none';
	}

	return (
		<article 
			className="block"
			onMouseEnter={ handleMouseEnter }
			onMouseLeave={ handleMouseLeave }
			onClick={ props.handleMovieClick }
		>
			<div className="block__text">
				<h2 className="block__title">{ props.title }</h2>
				<div className="block__extra">
					<div className="block__attr">
						<strong className="block__attr__label">Released:</strong>
						<span className="block__attr__value">{ props.year }</span>
					</div>
					<div className="block__attr">
						<strong className="block__attr__label">Directed by:</strong>
						<span className="block__attr__value">{ props.director }</span>
					</div>
				</div>
			</div>
			
			<LazyImg
				classNames={ 'block__img' }
				alt={ props.title }
				url={ props.backdrop }
			/>
		</article>
	)
	
}


Movie.propTypes = {
	id: 				PropTypes.number.isRequired,
	title: 				PropTypes.string.isRequired,
	year: 				PropTypes.string.isRequired,
	director: 			PropTypes.string.isRequired,
	backdrop: 			PropTypes.string.isRequired,

	handleMovieClick: 	PropTypes.func,
}


export default Movie;