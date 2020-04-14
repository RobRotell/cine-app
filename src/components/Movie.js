import React from 'react';
import PropTypes from 'prop-types';
import LazyImg from './LazyImg';


class Movie extends React.Component {

	handleMouseEnter = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title'),
			shift = el.querySelector('.block__extra').offsetHeight;

		title.style.transform = `scale( .66 ) translate3d( 0, -${shift}px, 0 )`;
	}

	handleMouseLeave = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title');

		title.style.transform = 'none';
	}

	render() {
		return (
			<article 
				className="block block--watched"
				onMouseEnter={ this.handleMouseEnter }
				onMouseLeave={ this.handleMouseLeave }
				onClick={ this.props.handleMovieClick }
			>
				<div className="block__text">
					<h2 className="block__title">{ this.props.title }</h2>
					<div className="block__extra">
						<div className="block__attr">
							<strong className="block__attr__label">Released:</strong>
							<span className="block__attr__value">{ this.props.year }</span>
						</div>
						<div className="block__attr">
							<strong className="block__attr__label">Directed by:</strong>
							<span className="block__attr__value">{ this.props.director }</span>
						</div>
					</div>
				</div>
				
				<LazyImg
					classNames="block__img"
					alt={ this.props.title }
					url={ this.props.backdrop }
				/>
			</article>
		)
	}
}


Movie.propTypes = {
	id: 				PropTypes.number.isRequired,
	title: 				PropTypes.string.isRequired,
	year: 				PropTypes.string.isRequired,
	director: 			PropTypes.string.isRequired,
	backdrop: 			PropTypes.string.isRequired,
	toWatch: 			PropTypes.bool.isRequired,
	handleMovieClick: 	PropTypes.func.isRequired
}


export default Movie;