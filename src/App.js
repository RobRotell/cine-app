import React, { Component } from 'react';
import './scss/app.scss';

// components
import Movielist from './components/Movielist';
import Nav from './components/Nav';
import BtnAdder from './components/BtnAdder';
import PopupDetail from './components/PopupDetail';
import PopupAdder from './components/PopupAdder';

// import helper functions
import wpIntegration from './helpers/wpIntegration';


class App extends Component {

	state = {
		adderActive: 	false,

		detailActive: 	false,
		activeMovieId: 	0,
		
		showWatched: 	true,
		moviesToWatch: 	[],
		moviesWatched: 	[]
	}


	componentDidMount = () => {
		const movies = wpIntegration.getMovies(),
			moviesToWatch = [],
			moviesWatched = [];

		movies.then( response => {
			response.forEach( movie => {
				if( movie.to_watch ) {
					moviesToWatch.push( movie );
				} else {
					moviesWatched.push( movie );
				}
			});

			this.setState({
				moviesToWatch: moviesToWatch,
				moviesWatched: moviesWatched
			});
		});
	}


	handleTabClick = e => {
		this.setState({
			adderActive: 	false,
			detailActive: 	false,
			activeMovieId: 	0,
			showWatched: 	( e.currentTarget.value === 'watched' )
		})
	}


	handleBtnAdderClick = e => {
		this.setState({
			adderActive: 	true,
		});
	}


	handleWatchedMovieClick = id => {
		this.setState({
			detailActive: 	true,
			activeMovieId: 	id
		});
	}


	handleToWatchMovieClick = id => {
		console.log( id );
	}	


	handleClosePopupDetail = e => {
		this.setState({
			detailActive: 	false,
			activeMovieId: 	0	
		})
	}


	handleClosePopupAdder = e => {
		this.setState({
			adderActive: false
		})
	}


	handleAddClick = ( id, action ) => {
		wpIntegration
			.addMovie( id, action )
			.then( newMovie => {
				if( action === 'toWatch' ) {
					this.setState({
						detailActive: 	false,
						adderActive: 	false,
						showWatched: 	false,
						moviesToWatch: 	[
							newMovie,
							...this.state.moviesToWatch
						]
					})
				} else {
					this.setState({
						detailActive: 	false,
						adderActive: 	false,
						showWatched: 	true,
						moviesWatched: 	[
							newMovie,
							...this.state.moviesWatched
						]
					});
				}
			});
	}


	render() {
		return (
			<main className="app">
				<Nav
					showWatched={ this.state.showWatched } 
					handleTabClick={ this.handleTabClick }
				/>
				<Movielist 
					display={ this.state.showWatched }
					movies={ this.state.moviesWatched } 
					handleMovieClick={ this.handleWatchedMovieClick }
				/>
				<Movielist 
					display={ !this.state.showWatched }
					movies={ this.state.moviesToWatch }
					handleMovieClick={ this.handleToWatchMovieClick } 
				/>
				<BtnAdder 
					handleBtnAdderClick={ this.handleBtnAdderClick }
				/>
				<PopupDetail
					isActive={ this.state.detailActive }
					activeMovieId={ this.state.activeMovieId }
					closePopup={ this.handleClosePopupDetail }
				/>
				<PopupAdder
					isActive={ this.state.adderActive }
					closeAdder={ this.handleClosePopupAdder }
					handleAddClick={ this.handleAddClick }
				/>
			</main>
		);
	}

}



export default App;
