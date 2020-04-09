import React from 'react';
import PropTypes from 'prop-types';
import LazyImg from './LazyImg';


class MovieToWatch extends React.Component {

	handleMouseEnter = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title'),
			shift = el.querySelector('.block__extra').offsetHeight;

		title.style.transform = `translate3d( 0, -${shift}px, 0 )`;
	}

	handleMouseLeave = e => {
		const el = e.currentTarget,
			title = el.querySelector('.block__title');

		title.style.transform = 'none';
	}

	// const displayMovieBtns = () => {
	// 	console.log( this, props );
	// }

	


	render() {
		return (
			<article 
				className="block block--to-watch"
				onMouseEnter={ this.handleMouseEnter }
				onMouseLeave={ this.handleMouseLeave }
			>

				<div className="block__btns result__btns">
					<button 
						className="block__btn result__btn"
						data-action="watched"
						//onClick={ this.addMovie }
						title="I watched this movie"
					>
						<i className="result__btn__icon">
							<svg viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
						</i>
					</button>
					<button 
						className="block__btn result__btn"
						data-action="delete"
						//onClick={ this.addMovie }
						title="I don't want to watch this movie"
					>
						<i className="result__btn__icon">
							<svg viewBox="0 0 365.696 365.696" xmlns="http://www.w3.org/2000/svg"><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>
						</i>
					</button>					
				</div>

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


MovieToWatch.propTypes = {
	id: 				PropTypes.number.isRequired,
	title: 				PropTypes.string.isRequired,
	year: 				PropTypes.string.isRequired,
	director: 			PropTypes.string.isRequired,
	backdrop: 			PropTypes.string.isRequired,
	toWatch: 			PropTypes.bool.isRequired,
	handleMovieClick: 	PropTypes.func.isRequired
}


export default MovieToWatch;